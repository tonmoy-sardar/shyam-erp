import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrganizationService } from '../../../core/services/purchase-organization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchase-organization-edit',
  templateUrl: './purchase-organization-edit.component.html',
  styleUrls: ['./purchase-organization-edit.component.scss']
})
export class PurchaseOrganizationEditComponent implements OnInit {
  purchaseOrganization;
  form: FormGroup;
  constructor(
    private purchaseOrganizationService: PurchaseOrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.purchaseOrganization = {
      id: '',
      name: '',
      description: ''
    };
    this.getPurchaseOrganizationDetails(this.route.snapshot.params['id']);
  }

  getPurchaseOrganizationDetails = function (id) {

    this.purchaseOrganizationService.getPurchaseOrganizationDetails(id).subscribe(
      (data: any[]) => {
        this.purchaseOrganization = data;
      }
    );
  }

  goToList = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  reSet() {
    this.form.reset();
  }
  updatePurchaseOrganization = function () {
    if (this.form.valid) {
      this.purchaseOrganizationService.updatePurchaseOrganization(this.purchaseOrganization).subscribe(
        response => {
          this.toastr.success('Purchase organization updated successfully', '', {
            timeOut: 3000,
          });
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
