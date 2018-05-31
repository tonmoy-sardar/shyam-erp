import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StatesService } from '../../../core/services/states.service';
import { ContractorsService } from '../../../core/services/contractors.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';

@Component({
  selector: 'app-contractors-add',
  templateUrl: './contractors-add.component.html',
  styleUrls: ['./contractors-add.component.scss']
})
export class ContractorsAddComponent implements OnInit {
  form: FormGroup;
  contractor_account: any[] = [];
  stateList = [];
  help_heading = "";
  help_description = "";
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private statesService: StatesService,
    private contractorService: ContractorsService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService

  ) { }

  ngOnInit() {
    //this.spinner.show();
    this.form = this.formBuilder.group({
      contractor_name: ['', Validators.required],
      pan_no: [''],
      gst_no: [''],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      contractor_account: this.formBuilder.array([this.createBankInfo()])
    });
    
    this.getStateList()
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      //this.help_heading = res.data.contractorAdd.heading;
      //this.help_description = res.data.contractorAdd.desc;
    })
  }

  
  getStateList() {
    this.statesService.getStateActiveList().subscribe(res => {
      this.stateList = res;
      // console.log(this.stateList);
    }
    );
  };

  createBankInfo() {
    return this.formBuilder.group({
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      account_no: ['', Validators.required],
      ifsc_code: ['', Validators.required]
    });
  }

 
  getBank(form) {
    return form.get('contractor_account').controls
  }
  addBank() {
    const control = <FormArray>this.form.controls['contractor_account'];
    control.push(this.createBankInfo());
  }
  deleteBank(index: number) {
    const control = <FormArray>this.form.controls['contractor_account'];
    control.removeAt(index);
  }
  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addContractor() {
    if (this.form.valid) {
      this.spinner.show();
      console.log(this.form.value);
      this.contractorService.addNewContractor(this.form.value).subscribe(
        response => {
         
          this.toastr.success('Contractor added successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('contractors');
        },
        error => {
          console.log('error', error)
          this.spinner.hide();
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
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
    };
  }


}
