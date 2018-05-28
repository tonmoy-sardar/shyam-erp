import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentsService } from '../../../core/services/departments.service';
import { CompanyService } from '../../../core/services/company.service';
import { DesignationsService } from '../../../core/services/designations.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';

@Component({
  selector: 'app-designations-add',
  templateUrl: './designations-add.component.html',
  styleUrls: ['./designations-add.component.scss']
})
export class DesignationsAddComponent implements OnInit {

  company_list: any[] = [];
  department_list: any[] = [];
  form: FormGroup;
  help_heading = "";
  help_description = ""; 
  constructor(
    private departmentsService: DepartmentsService,
    private companyService: CompanyService,
    private designationsService: DesignationsService,
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
      departments: ['',Validators.required],
      designation_name: ['', Validators.required]
    });    
    this.getHelp();
    this.getCompanyList();
  }

  getHelp(){
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.stateAdd.heading;
      this.help_description = res.data.stateAdd.desc;
    })
  }

  getCompanyList(){
    this.companyService.getCompanyDropdownList().subscribe(res => {
      this.company_list = res;
      this.spinner.hide();
    })
  }

  companyChange(val){
    if(val != ""){
      this.getDepartmentList(val);
    }
  }

  getDepartmentList(id){
    this.departmentsService.getDepartmentListByCompany(id).subscribe(res => {
      this.department_list = res;
    })
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addDesignation() {
    if (this.form.valid) {
      this.spinner.show();
      this.designationsService.addNewDesignation(this.form.value).subscribe(
        response => {
          this.toastr.success('Designation added successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('designations');          
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


  btnClickNav (toNav) {
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
