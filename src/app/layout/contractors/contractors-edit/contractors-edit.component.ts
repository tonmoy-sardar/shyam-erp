import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StatesService } from '../../../core/services/states.service';
import { ContractorsService } from '../../../core/services/contractors.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';

@Component({
  selector: 'app-contractors-edit',
  templateUrl: './contractors-edit.component.html',
  styleUrls: ['./contractors-edit.component.scss']
})
export class ContractorsEditComponent implements OnInit {
  form: FormGroup;
  contractor_account: any[] = [];
  stateList = [];
  contractor_details;
  help_heading = "";
  help_description = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private statesService: StatesService,
    private contractorsService: ContractorsService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
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
      contractor_account: this.formBuilder.array([])
    });
    this.contractor_details = {
      id: '',
      contractor_name: '',
      pan_no: '',
      gst_no: '',
      email: '',
      mobile: '',
      address: '',
      state: '',
      city: '',
      pincode: '',
      
      contractor_account: [
        {
          bank_name: '',
          branch_name: '',
          account_no: '',
          ifsc_code: ''
        }
      ]
    }
    this.getStateList()
    this.getContractorDetails(this.route.snapshot.params['id']);
    this.getHelp();
  }
  

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      //this.help_heading = res.data.contractorEdit.heading;
      //this.help_description = res.data.contractorEdit.desc;
    })
  }

  getStateList() {
    this.statesService.getStateActiveList().subscribe(res => {
      this.stateList = res;
      // console.log(this.stateList);
    }
    );
  };
  getContractorDetails(id) {
    this.contractorsService.getContractorDetails(id).subscribe(res => {
      this.contractor_details = res;
      console.log(this.contractor_details);
      const account_control = <FormArray>this.form.controls['contractor_account'];
      this.contractor_details.contractor_account.forEach( x => {
        account_control.push(this.createBankInfo());
      })
      this.spinner.hide();
    })
  }

  createBankInfo() {
    return this.formBuilder.group({
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      account_no: ['', Validators.required],
      ifsc_code: ['', Validators.required]
    });
  }

  getBank(form){
    return form.get('contractor_account').controls
  }
  addBank() {
    var contractor_accnt = {
      bank_name: '',
      branch_name: '',
      account_no: '',
      ifsc_code: ''
    }
    this.contractor_details.contractor_account.push(contractor_accnt)
    const control = <FormArray>this.form.controls['contractor_account'];
    control.push(this.createBankInfo());
  }
  deleteBank(index: number) {
    if (index > -1) {
      this.contractor_details.contractor_account.splice(index, 1)
    }
    const control = <FormArray>this.form.controls['contractor_account'];
    control.removeAt(index);
  }
  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  updateContractor() {
    if (this.form.valid) {
      this.spinner.show();
      this.contractorsService.updateContractor(this.contractor_details).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('Contractor updated successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('contractors');
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
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
    };
  }

}
