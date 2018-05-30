import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentsService } from '../../../core/services/departments.service';
import { CompanyService } from '../../../core/services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';

@Component({
  selector: 'app-departments-add',
  templateUrl: './departments-add.component.html',
  styleUrls: ['./departments-add.component.scss']
})
export class DepartmentsAddComponent implements OnInit {
  company_list: any[] = [];
  form: FormGroup;
  help_heading = "";
  help_description = "";
  constructor(
    private departmentsService: DepartmentsService,
    private companyService: CompanyService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      company: ['', Validators.required],
      department_name: ['', Validators.required]
    });
    this.getHelp();
    this.getCompanyList();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.departmentAdd.heading;
      this.help_description = res.data.departmentAdd.desc;
    })
  }

  getCompanyList() {
    this.companyService.getCompanyDropdownList().subscribe(res => {
      this.company_list = res;
      this.spinner.hide();
    })
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addDepartment() {
    if (this.form.valid) {
      this.spinner.show();
      this.departmentsService.addNewDepartment(this.form.value).subscribe(
        response => {
          this.toastr.success('Department added successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('departments');
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
