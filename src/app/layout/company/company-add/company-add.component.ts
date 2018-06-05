import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { StatesService } from '../../../core/services/states.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.scss']
})
export class CompanyAddComponent implements OnInit {
  companyList=[];
  stateList;
  form: FormGroup;
  help_heading = "";
  help_description = "";
  constructor(
    private companyService: CompanyService,
    private statesService: StatesService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.form = new FormGroup({
      parent: new FormControl('', Validators.required),
      company_name: new FormControl('', Validators.required),
      company_url: new FormControl('', [
        Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
      ]),
      company_email: new FormControl('', [
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]),
      company_contact: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12)
      ]),
      company_address: new FormControl('', Validators.required),
      company_state: new FormControl('', Validators.required),
      company_city: new FormControl('', Validators.required),
      company_pin: new FormControl('', Validators.required),
      company_gst: new FormControl(''),
      company_pan: new FormControl(''),
      company_cin: new FormControl('')
    });
    this.getCompanyDropdownList();
    this.getStateList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.companyAdd.heading;
      this.help_description = res.data.companyAdd.desc;
    })
  }


  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addNewCompany() {
    if (this.form.valid) {
      this.spinner.show();
      this.companyService.addNewCompany(this.form.value).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('Company added successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('company');
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

  getStateList() {
    this.statesService.getStateActiveList().subscribe(
      (data: any[]) => {
        this.stateList = data;
        this.spinner.hide();
      }
    );
  };

  getCompanyDropdownList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;
        // console.log(this.companyList);
      }
    );
  };

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  reSet() {
    this.form.reset();
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched),
      'is-valid': this.form.controls[field].valid && (this.form.controls[field].dirty || this.form.controls[field].touched)
    };
  }

}
