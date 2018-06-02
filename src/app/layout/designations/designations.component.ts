import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DesignationsService } from '../../core/services/designations.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../../core/component/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent implements OnInit {

  designationList = [];
  defaultPagination: number;
  totalDesignationList: number;
  search_key = '';
  sort_by = '';
  sort_type= '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  headerThOption = [];
  constructor(
    private designationsService: DesignationsService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.headerThOption = [
      {  
        name: "Designation",
        code: "designation_name",
        sort_type:''
      },
      {  
        name: "Department",
        code: "departments.department_name",
        sort_type:''
      },
      {  
        name: "Company",
        code: "company.company_name",
        sort_type:''
      },
      {  
        name: "Status",
        code: "status",
        sort_type:''
      }
    ];
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getDesignationList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.designation.heading;
      this.help_description = res.data.designation.desc;
    })
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getDesignationList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getDesignationList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if(this.search_key !='')
    {
      params.set('search', this.search_key.toString());
    }
    if(this.sort_by !='')
    {
      params.set('field_name', this.sort_by.toString());
    }

    if(this.sort_type !='')
    {
      params.set('order_by', this.sort_type.toString());
    }
    this.designationsService.getDesignationList(params).subscribe(
      (data: any[]) => {
        this.totalDesignationList = data['count'];
        this.designationList = data['results'];
        // console.log(this.designationList)
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalDesignationList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalDesignationList
        }
        this.spinner.hide();
        // console.log(data)
      }
    );
  };

  activeDesignation(id) {
    this.spinner.show();
    let designation;

    designation = {
      id: id,
      status: true
    };
    this.designationsService.activeInactiveDesignation(designation).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getDesignationList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactiveDesignation(id) {
    this.spinner.show();
    let designation;

    designation = {
      id: id,
      status: false
    };

    this.designationsService.activeInactiveDesignation(designation).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getDesignationList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  deleteDesignation(id) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        let department;

        department = {
          id: id,
          is_deleted: true
        };

        this.designationsService.deleteDesignation(department).subscribe(
          response => {
            this.toastr.success('Department deleted successfully', '', {
              timeOut: 3000,
            });
            this.getDesignationList();
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
    this.getDesignationList();
  };

  sortTable(value)
  {
    let type = '';
    this.headerThOption.forEach(function (optionValue) {
      if(optionValue.code == value)
      {
        if(optionValue.sort_type =='desc')
        {
          type = 'asc';
        }
        else
        {
          type = 'desc';
        }
        optionValue.sort_type = type;
      }
      else{
        optionValue.sort_type = '';
      }
    });

    this.sort_by = value;
    this.sort_type = type;
    this.spinner.show();
    this.defaultPagination = 1;
    this.getDesignationList();
  };

}
