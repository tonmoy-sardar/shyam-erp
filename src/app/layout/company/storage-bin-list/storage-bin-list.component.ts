import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { StatesService } from '../../../core/services/states.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';

@Component({
  selector: 'app-storage-bin-list',
  templateUrl: './storage-bin-list.component.html',
  styleUrls: ['./storage-bin-list.component.scss']
})
export class StorageBinListComponent implements OnInit {
  companyStorageBinList = [];
  states;
  companyStorageBinCompShow;
  companyStorageBinId;
  defaultPagination: number;
  totalcompanyStorageBinList: number;
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
    this.companyStorageBinCompShow = {
      showList: true,
      showAdd: false,
      showEdit: false
    };

    this.getCompanyStorageBinList(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.storageBin.heading;
      this.help_description = res.data.storageBin.desc;
    })
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  showStorageBinAdd = function () {
    this.companyStorageBinCompShow = {
      showList: false,
      showAdd: true,
      showEdit: false
    };
  };

  showStorageBinEdit = function (id) {
    this.companyStorageBinId = id;
    this.companyStorageBinCompShow = {
      showList: false,
      showAdd: false,
      showEdit: true
    };
  };

  reloadStorageBinList = function () {
    this.companyStorageBinCompShow = {
      showList: true,
      showAdd: false,
      showEdit: false
    };

    this.getCompanyStorageBinList(this.route.snapshot.params['id']);
  }

  getCompanyStorageBinList = function (id) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.companyService.getCompanyStorageBinList(id,params).subscribe(
      (data: any[]) => {
        this.companyStorageBinList = data['results'];
        this.totalcompanyStorageBinList = data['count'];
        this.itemNo = (this.defaultPagination - 1) * Globals.pageSize;
        this.lower_count = this.itemNo + 1;

        if(this.totalcompanyStorageBinList > Globals.pageSize*this.defaultPagination){
          this.upper_count = Globals.pageSize*this.defaultPagination
        }
        else{
          this.upper_count = this.totalcompanyStorageBinList
        }
        this.spinner.hide();
      }
    );
  };

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getCompanyStorageBinList(this.route.snapshot.params['id']);
  }

  pagination = function () {
    this.spinner.show();
    this.getCompanyStorageBinList(this.route.snapshot.params['id']);
  };


}
