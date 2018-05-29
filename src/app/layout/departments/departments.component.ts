import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentsService } from '../../core/services/departments.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  departmentList = [];  
  defaultPagination: number;
  totaldepartmentList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  constructor(
    private departmentsService: DepartmentsService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.getdepartmentList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.department.heading;
      this.help_description = res.data.department.desc;
    })
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getdepartmentList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getdepartmentList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.departmentsService.getDepartmentList(params).subscribe(
      (data: any[]) => {
        this.totaldepartmentList = data['count'];
        this.departmentList = data['results'];
        // console.log(this.departmentList)
        this.itemNo = (this.defaultPagination - 1) * Globals.pageSize;
        this.lower_count = this.itemNo + 1;
        if(this.totaldepartmentList > Globals.pageSize*this.defaultPagination){
          this.upper_count = Globals.pageSize*this.defaultPagination
        }
        else{
          this.upper_count = this.totaldepartmentList
        }
        this.spinner.hide();
        // console.log(data)
      }
    );
  };

  activeState(id) {
    this.spinner.show();
    let department;

    department = {
      id: id,
      status: true
    };
    this.departmentsService.activeInactiveDepartment(department).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getdepartmentList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactiveState(id) {
    this.spinner.show();
    let department;

    department = {
      id: id,
      status: false
    };

    this.departmentsService.activeInactiveDepartment(department).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getdepartmentList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  deleteDepartment(id) {
    this.spinner.show();
    let department;

    department = {
      id: id
    };

    this.departmentsService.deleteDepartment(department).subscribe(
      response => {
        this.toastr.success('Department deleted successfully', '', {
          timeOut: 3000,
        });
        this.getdepartmentList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  pagination() {
    this.spinner.show();
    this.getdepartmentList();
  };

}
