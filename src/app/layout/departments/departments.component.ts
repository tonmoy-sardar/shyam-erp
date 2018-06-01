import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentsService } from '../../core/services/departments.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../../core/component/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  departmentList = [];
  defaultPagination: number;
  totalDepartmentList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    private departmentsService: DepartmentsService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
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
        this.totalDepartmentList = data['count'];
        this.departmentList = data['results'];
        // console.log(this.departmentList)
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalDepartmentList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalDepartmentList
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
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
      }
      this.dialogRef = null;
    });

  };

  pagination() {
    this.spinner.show();
    this.getdepartmentList();
  };

}
