import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { TermsConditionService } from '../../../core/services/terms-condition.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-terms-condition-add',
  templateUrl: './terms-condition-add.component.html',
  styleUrls: ['./terms-condition-add.component.scss']
})
export class TermsConditionAddComponent implements OnInit {
  form: FormGroup;
  companyList = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private termsConditionService: TermsConditionService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      term_type: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      term_text: new FormControl('', Validators.required)
    });
    this.getCompanyDropdownList()
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  getCompanyDropdownList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;
        // console.log(this.companyList);
      }
    );
  };
  addNewTerms() {
    if (this.form.valid) {
      this.termsConditionService.addNewTerms(this.form.value).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('Terms and services added successfully', '', {
            timeOut: 3000,
          });
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
