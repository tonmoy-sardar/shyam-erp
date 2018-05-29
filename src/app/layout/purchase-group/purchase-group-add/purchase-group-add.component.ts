import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseGroupService } from '../../../core/services/purchase-group.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';

@Component({
  selector: 'app-purchase-group-add',
  templateUrl: './purchase-group-add.component.html',
  styleUrls: ['./purchase-group-add.component.scss']
})
export class PurchaseGroupAddComponent implements OnInit {
  form: FormGroup;
  help_heading = "";
  help_description = "";
  constructor(
    private purchaseGroupService: PurchaseGroupService,
    private router: Router,
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
    this.spinner.hide();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseGroupAdd.heading;
      this.help_description = res.data.purchaseGroupAdd.desc;
    })
  }
  
  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addNewPurchaseGroup() {
    if (this.form.valid) {
      this.spinner.show();
      this.purchaseGroupService.addNewPurchaseGroup(this.form.value).subscribe(
        response => {
          this.toastr.success('Purchase group added successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('purchase-group');
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
