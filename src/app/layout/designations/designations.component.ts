import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DesignationsService } from '../../core/services/designations.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent implements OnInit {

  designationList = [];  
  defaultPagination: number;
  totaldesignationList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  constructor(
    private designationsService: DesignationsService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.getDesignationList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.state.heading;
      this.help_description = res.data.state.desc;
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
    params.set('search', this.search_key.toString());
    this.designationsService.getDesignationList(params).subscribe(
      (data: any[]) => {
        this.totaldesignationList = data['count'];
        this.designationList = data['results'];
        // console.log(this.designationList)
        this.itemNo = (this.defaultPagination - 1) * Globals.pageSize;
        this.lower_count = this.itemNo + 1;
        if(this.totaldesignationList > Globals.pageSize*this.defaultPagination){
          this.upper_count = Globals.pageSize*this.defaultPagination
        }
        else{
          this.upper_count = this.totaldesignationList
        }
        this.spinner.hide();
        // console.log(data)
      }
    );
  };

  activeState(id) {
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

  inactiveState(id) {
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
    this.spinner.show();
    let department;

    department = {
      id: id
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
  };

  pagination() {
    this.spinner.show();
    this.getDesignationList();
  };

}
