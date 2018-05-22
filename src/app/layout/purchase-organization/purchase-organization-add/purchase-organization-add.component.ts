import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrganizationService } from '../../../core/services/purchase-organization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purchase-organization-add',
  templateUrl: './purchase-organization-add.component.html',
  styleUrls: ['./purchase-organization-add.component.scss']
})
export class PurchaseOrganizationAddComponent implements OnInit {
  form: FormGroup;
  constructor(
    private purchaseOrganizationService: PurchaseOrganizationService,
    private router: Router,
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
    this.spinner.hide();
  }

  goToList = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addNewPurchaseOrganization = function () {
    if (this.form.valid) {
      this.spinner.show();
      this.purchaseOrganizationService.addNewPurchaseOrganization(this.form.value).subscribe(
        response => {
          this.toastr.success('Purchase organization added successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('purchase-organization');
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
