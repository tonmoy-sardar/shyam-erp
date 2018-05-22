import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StatesService } from '../../../core/services/states.service';
import { VendorService } from '../../../core/services/vendor.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.scss']
})
export class VendorAddComponent implements OnInit {
  form: FormGroup;
  vendor_address: any[] = [];
  vendor_account: any[] = [];
  stateList = [];
  vendorTypeList = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private statesService: StatesService,
    private vendorService: VendorService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      vendor_fullname: ['', Validators.required],
      vendor_type: ['', Validators.required],
      pan_no: ['', Validators.required],
      cin_no: ['', Validators.required],
      gst_no: ['', Validators.required],
      amount_credit: ['', Validators.required],
      amount_debit: ['', Validators.required],
      vendor_address: this.formBuilder.array([ this.createContactInfo() ]),
      vendor_account: this.formBuilder.array([ this.createBankInfo() ])
    });
   this.getVendorTypeList()
    this.getStateList()
  }
  getVendorTypeList(){
    this.vendorService.getVendorTypeList().subscribe(res => {
      this.vendorTypeList = res.results;
      this.spinner.hide();
    })
  }
  getStateList() {
    this.statesService.getStateActiveList().subscribe(res => {
      this.stateList = res;
      // console.log(this.stateList);
    }
    );
  };
  createContactInfo() {
    return this.formBuilder.group({
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      contact_person: ['', Validators.required],
      designation: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }

  createBankInfo() {
    return this.formBuilder.group({
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      account_no: ['', Validators.required],
      ifsc_code: ['', Validators.required]
    });
  }

  getContact(form){
    return form.get('vendor_address').controls
  }
  addContact(){
    const control = <FormArray>this.form.controls['vendor_address'];
    control.push(this.createContactInfo());
  }

  deleteContact(index: number){
    const control = <FormArray>this.form.controls['vendor_address'];
    control.removeAt(index);
  }

  getBank(form){
    return form.get('vendor_account').controls
  }
  addBank(){
    const control = <FormArray>this.form.controls['vendor_account'];
    control.push(this.createBankInfo());
  }
  deleteBank(index: number){
    const control = <FormArray>this.form.controls['vendor_account'];
    control.removeAt(index);
  } 
  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };
  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  addVendor () {
    if (this.form.valid) {
      this.spinner.show();
      this.vendorService.addNewVendor(this.form.value).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('Vendor added successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('vendor');
        },
        error => {
          console.log('error', error)
          // this.toastr.error('everything is broken', '', {
          //   timeOut: 3000,
          // });
        }
      );
    } else {
      this.markFormGroupTouched(this.form)
    }

  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  reSet() {
    this.form.reset();
  }
  
  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty ||this.form.get(field).touched)
    };
  }

}
