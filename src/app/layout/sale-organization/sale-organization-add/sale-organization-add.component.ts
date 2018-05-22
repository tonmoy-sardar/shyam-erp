import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleOrganizationService } from '../../../core/services/sale-organization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sale-organization-add',
  templateUrl: './sale-organization-add.component.html',
  styleUrls: ['./sale-organization-add.component.scss']
})
export class SaleOrganizationAddComponent implements OnInit {
  form: FormGroup;
  constructor(
    private saleOrganizationService: SaleOrganizationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  goToList = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addNewSaleOrganization = function () {
    if (this.form.valid) {
      this.saleOrganizationService.addNewSaleOrganization(this.form.value).subscribe(
        response => {
          this.toastr.success('Sale organization added successfully', '', {
            timeOut: 3000,
          });
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
