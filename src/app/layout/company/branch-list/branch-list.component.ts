import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CompanyService } from '../../../core/services/company.service';
import { StatesService } from '../../../core/services/states.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {
  companyBranchList = [];
  states;
  companyBranchCompShow;
  companyBranchId;
  defaultPagination: number;
  totalcompanyBranchList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;

  constructor(
    private companyService: CompanyService,
    private statesService: StatesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.companyBranchCompShow = {
      showList: true,
      showAdd: false,
      showEdit: false
    };

    this.getCompanyBranchList(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.branch.heading;
      this.help_description = res.data.branch.desc;
    })
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  showBranchAdd = function () {
    this.companyBranchCompShow = {
      showList: false,
      showAdd: true,
      showEdit: false
    };
  };

  showBranchEdit = function (id) {
    this.companyBranchId = id;
    this.companyBranchCompShow = {
      showList: false,
      showAdd: false,
      showEdit: true
    };
  };

  reloadBranchList = function () {
    this.companyBranchCompShow = {
      showList: true,
      showAdd: false,
      showEdit: false
    };

    this.getCompanyBranchList(this.route.snapshot.params['id']);
  }

  getCompanyBranchList = function (id) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.companyService.getCompanyBranchList(id,params).subscribe(
      (data: any[]) => {
        this.totalcompanyBranchList = data['count'];
        this.companyBranchList = data['results'];

        this.itemNo = (this.defaultPagination - 1) * Globals.pageSize;
        this.lower_count = this.itemNo + 1;

        if(this.totalcompanyBranchList > Globals.pageSize*this.defaultPagination){
          this.upper_count = Globals.pageSize*this.defaultPagination
        }
        else{
          this.upper_count = this.totalcompanyBranchList
        }

        this.spinner.hide();
      }
    );
  };

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getCompanyBranchList(this.route.snapshot.params['id']);
  }

  pagination = function () {
    this.spinner.show();
    this.getCompanyBranchList(this.route.snapshot.params['id']);
  };

}
