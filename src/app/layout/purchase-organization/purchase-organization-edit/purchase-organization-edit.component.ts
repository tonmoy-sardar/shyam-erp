import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrganizationService } from '../../../core/services/purchase-organization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';

@Component({
  selector: 'app-purchase-organization-edit',
  templateUrl: './purchase-organization-edit.component.html',
  styleUrls: ['./purchase-organization-edit.component.scss']
})
export class PurchaseOrganizationEditComponent implements OnInit {
  purchaseOrganization;
  form: FormGroup;
  help_heading = "";
  help_description = "";
  constructor(
    private purchaseOrganizationService: PurchaseOrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
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
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseOrganizationEdit.heading;
      this.help_description = res.data.purchaseOrganizationEdit.desc;
    })
  }

  getPurchaseOrganizationDetails(id) {

    this.purchaseOrganizationService.getPurchaseOrganizationDetails(id).subscribe(
      (data: any[]) => {
        this.purchaseOrganization = data;
        this.spinner.hide();
      }
    );
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  reSet() {
    this.form.reset();
  }
  updatePurchaseOrganization() {
    if (this.form.valid) {
      this.spinner.show();
      this.purchaseOrganizationService.updatePurchaseOrganization(this.purchaseOrganization).subscribe(
        response => {
          this.toastr.success('Purchase organization updated successfully', '', {
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
