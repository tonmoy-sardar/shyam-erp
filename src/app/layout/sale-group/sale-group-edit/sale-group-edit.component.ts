import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleGroupService } from '../../../core/services/sale-group.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-sale-group-edit',
  templateUrl: './sale-group-edit.component.html',
  styleUrls: ['./sale-group-edit.component.scss']
})
export class SaleGroupEditComponent implements OnInit {
  saleGroup;
  form: FormGroup;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private saleGroupService: SaleGroupService,
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
    this.saleGroup = {
      id: '',
      name: '',
      description: ''
    };
    this.getSaleGroupDetails(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.saleGroupEdit.heading;
      this.help_description = res.data.saleGroupEdit.desc;
    })
  }

  getSaleGroupDetails(id) {
    this.saleGroupService.getSaleGroupDetails(id).subscribe(
      (data: any[]) => {
        this.saleGroup = data;
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


  updateSaleGroup() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.saleGroupService.updateSaleGroup(this.saleGroup).subscribe(
        response => {
          this.toastr.success('Sale group updated successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('sale-group');
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
