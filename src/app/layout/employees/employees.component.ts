import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../../core/services/employees.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employeeList = [];  
  defaultPagination: number;
  totalEmployeeList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getEmployeeList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.employee.heading;
      this.help_description = res.data.employee.desc;
    })
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getEmployeeList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getEmployeeList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.employeesService.getEmployeeList(params).subscribe(
      (data: any[]) => {
        this.totalEmployeeList = data['count'];
        this.employeeList = data['results'];
        // console.log(this.employeeList)
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if(this.totalEmployeeList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalEmployeeList
        }
        this.spinner.hide();
        // console.log(data)
      },
      error =>{
        this.spinner.hide();
      }
    );
  };

  activeState(id) {
    this.spinner.show();
    let employee;

    employee = {
      id: id,
      status: true
    };
    this.employeesService.activeInactiveEmployee(employee).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getEmployeeList();
      },
      error => {
        this.spinner.hide();
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactiveState(id) {
    this.spinner.show();
    let employee;

    employee = {
      id: id,
      status: false
    };

    this.employeesService.activeInactiveEmployee(employee).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getEmployeeList();
      },
      error => {
        this.spinner.hide();
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  deleteEmployee(id) {
    this.spinner.show();
    let employee;

    employee = {
      id: id
    };

    this.employeesService.deleteEmployee(employee).subscribe(
      response => {
        this.toastr.success('Employee deleted successfully', '', {
          timeOut: 3000,
        });
        this.getEmployeeList();
      },
      error => {
        this.spinner.hide();
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  pagination() {
    this.spinner.show();
    this.getEmployeeList();
  };

}
