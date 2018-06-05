import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleOrganizationService } from '../../../core/services/sale-organization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-sale-organization-edit',
  templateUrl: './sale-organization-edit.component.html',
  styleUrls: ['./sale-organization-edit.component.scss']
})
export class SaleOrganizationEditComponent implements OnInit {
  saleOrganization;
  form: FormGroup;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private saleOrganizationService: SaleOrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.saleOrganization = {
      id: '',
      name: '',
      description: ''
    };
    this.getSaleOrganizationDetails(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.saleOrganizationEdit.heading;
      this.help_description = res.data.saleOrganizationEdit.desc;
    })
  }

  getSaleOrganizationDetails(id) {
    this.saleOrganizationService.getSaleOrganizationDetails(id).subscribe(
      (data: any[]) => {
        this.saleOrganization = data;
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };


  updateSaleOrganization() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.saleOrganizationService.updateSaleOrganization(this.saleOrganization).subscribe(
        response => {
          this.toastr.success('Sale organization updated successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('sale-organization');
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }    
  }

  reSet() {
    this.form.reset();
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': !this.form.get(field).valid && this.form.get(field).touched,
      'is-valid': this.form.get(field).valid
    };
  }

}
