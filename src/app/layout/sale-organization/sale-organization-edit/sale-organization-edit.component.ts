import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleOrganizationService } from '../../../core/services/sale-organization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sale-organization-edit',
  templateUrl: './sale-organization-edit.component.html',
  styleUrls: ['./sale-organization-edit.component.scss']
})
export class SaleOrganizationEditComponent implements OnInit {
  saleOrganization;
  form: FormGroup;
  constructor(
    private saleOrganizationService: SaleOrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
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
  }

  getSaleOrganizationDetails = function (id) {
    this.saleOrganizationService.getSaleOrganizationDetails(id).subscribe(
      (data: any[]) => {
        this.saleOrganization = data;
        this.spinner.hide();
      }
    );
  }

  goToList = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };


  updateSaleOrganization = function () {
    if (this.form.valid) {
      this.spinner.show();
      this.saleOrganizationService.updateSaleOrganization(this.saleOrganization).subscribe(
        response => {
          this.toastr.success('Sale organization updated successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('sale-organization');
        },
        error => {
          console.log('error', error)
          // this.toastr.error('everything is broken', '', {
          //   timeOut: 3000,
          // });
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

  btnClickNav = function (toNav) {
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
