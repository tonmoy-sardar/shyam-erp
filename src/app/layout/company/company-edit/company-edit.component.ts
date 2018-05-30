import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { StatesService } from '../../../core/services/states.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  company;
  stateList;
  form: FormGroup;
  help_heading = "";
  help_description = "";
  constructor(
    private companyService: CompanyService,
    private statesService: StatesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.form = new FormGroup({
      company_name: new FormControl('', Validators.required),
      company_url: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
      ]),
      company_email: new FormControl('', [
        Validators.required,
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
      company_gst: new FormControl('', Validators.required),
      company_pan: new FormControl('', Validators.required),
      company_cin: new FormControl('', Validators.required)
    });
    this.company = {
      id: '',
      company_name: '',
      company_url: '',
      company_email: '',
      company_contact: '',
      company_address: '',
      company_state: '',
      company_city: '',
      company_pin: '',
      company_gst: '',
      company_pan: '',
      company_cin: ''
    };
    this.getCompanyDetails(this.route.snapshot.params['id']);
    this.getStateList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.companyEdit.heading;
      this.help_description = res.data.companyEdit.desc;
    })
  }

  getCompanyDetails(id) {

    this.companyService.getCompanyDetails(id).subscribe(
      (data: any[]) => {
        this.company = data;
        this.spinner.hide();
      }
    );
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };


  updateCompany() {
    if (this.form.valid) {
      this.spinner.show();
      this.companyService.updateCompany(this.company).subscribe(
        response => {
          this.toastr.success('Company updated successfully', '', {
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
