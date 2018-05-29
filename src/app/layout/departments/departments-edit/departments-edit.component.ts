import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../../../core/services/departments.service';
import { CompanyService } from '../../../core/services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';

@Component({
  selector: 'app-departments-edit',
  templateUrl: './departments-edit.component.html',
  styleUrls: ['./departments-edit.component.scss']
})
export class DepartmentsEditComponent implements OnInit {
  department_deatils: any;
  company_list: any[] = [];
  form: FormGroup;
  visible_key: boolean;
  help_heading = "";
  help_description = "";
  constructor(
    private departmentsService: DepartmentsService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.department_deatils = {
      company: '',
      department_name: '',
    }
    this.form = this.formBuilder.group({
      company: ['', Validators.required],
      department_name: ['', Validators.required]
    });
    this.getDepartmentDetails(this.route.snapshot.params['id']);
    this.getHelp();
    this.getCompanyList();
  }

  getDepartmentDetails(id) {
    this.departmentsService.getDepartmentDetails(id).subscribe(res => {
      this.department_deatils = res;
      this.visible_key = true;
      // console.log(this.department_deatils)
      this.spinner.hide();
    })
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.departmentEdit.heading;
      this.help_description = res.data.departmentEdit.desc;
    })
  }

  getCompanyList() {
    this.companyService.getCompanyDropdownList().subscribe(res => {
      this.company_list = res;
      // console.log(res)
    })
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  updateDepartment() {
    if (this.form.valid) {
      this.spinner.show();
      this.departmentsService.updateDepartment(this.department_deatils).subscribe(
        response => {
          this.toastr.success('Department updated successfully', '', {
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
