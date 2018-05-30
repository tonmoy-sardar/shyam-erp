import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorTypeService } from '../../../core/services/vendor-type.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';


@Component({
  selector: 'app-vendor-type-add',
  templateUrl: './vendor-type-add.component.html',
  styleUrls: ['./vendor-type-add.component.scss']
})
export class VendorTypeAddComponent implements OnInit {
  form: FormGroup;
  help_heading = "";
  help_description = "";
  constructor(
    private vendorTypeService: VendorTypeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      vendor_type: [null, Validators.required],
      
    });
    this.spinner.hide();
    this.getHelp();
  }

  getHelp(){
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.vendorTypeAdd.heading;
      this.help_description = res.data.vendorTypeAdd.desc;
    })
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addVendorType(){
    if (this.form.valid) {
      this.spinner.show();
      this.vendorTypeService.addNewVendorType(this.form.value).subscribe(
        response => {
          this.toastr.success('Vendor type added successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('vendor-type');          
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
