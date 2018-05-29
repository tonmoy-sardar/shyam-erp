import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { TermsConditionService } from '../../../core/services/terms-condition.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';

@Component({
  selector: 'app-terms-condition-edit',
  templateUrl: './terms-condition-edit.component.html',
  styleUrls: ['./terms-condition-edit.component.scss']
})
export class TermsConditionEditComponent implements OnInit {
  termsCondition;
  form: FormGroup;
  companyList = [];
  help_heading = "";
  help_description = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private termsConditionService: TermsConditionService,
    private companyService: CompanyService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.form = new FormGroup({
      term_type: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      term_text: new FormControl('', Validators.required)
    });
    this.termsCondition = {
      term_type: '',
      company: '',
      term_text: ''
    };
    this.getCompanyDropdownList()
    this.getTermsCondition(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.termsEdit.heading;
      this.help_description = res.data.termsEdit.desc;
    })
  }

  getCompanyDropdownList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;
        // console.log(this.companyList);
      }
    );
  };
  getTermsCondition(id) {
    this.termsConditionService.getTermsDetails(id).subscribe(
      (data: any[]) => {
        this.termsCondition = data;
        this.spinner.hide();
      }
    );

  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  updateTerms () {
    if (this.form.valid) {
      this.spinner.show();
      this.termsConditionService.updateTerms(this.termsCondition).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('Terms and services updated successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('terms-condition');
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

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched),
      'is-valid': this.form.controls[field].valid && (this.form.controls[field].dirty || this.form.controls[field].touched)
    };
  }

}
