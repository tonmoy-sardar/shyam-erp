import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { StatesService } from '../../../core/services/states.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';

@Component({
  selector: 'app-storage-location-list',
  templateUrl: './storage-location-list.component.html',
  styleUrls: ['./storage-location-list.component.scss']
})
export class StorageLocationListComponent implements OnInit {
  companyStorageList = [];
  states;
  companyStorageCompShow;
  companyStorageId;
  defaultPagination: number;
  totalcompanyStorageList: number;
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
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.companyStorageCompShow = {
      showList: true,
      showAdd: false,
      showEdit: false
    };

    this.getCompanyStorageList(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.storageLocation.heading;
      this.help_description = res.data.storageLocation.desc;
    })
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  showStorageAdd = function () {
    this.companyStorageCompShow = {
      showList: false,
      showAdd: true,
      showEdit: false
    };
  };

  showStorageEdit = function (id) {
    this.companyStorageId = id;
    this.companyStorageCompShow = {
      showList: false,
      showAdd: false,
      showEdit: true
    };
  };

  reloadStorageList = function () {
    this.companyStorageCompShow = {
      showList: true,
      showAdd: false,
      showEdit: false
    };

    this.getCompanyStorageList(this.route.snapshot.params['id']);
  }

  getCompanyStorageList = function (id) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.companyService.getCompanyStorageList(id,params).subscribe(
      (data: any[]) => {
        this.totalcompanyStorageList = data['count'];
        this.companyStorageList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * Globals.pageSize;
        this.lower_count = this.itemNo + 1;

        if(this.totalcompanyStorageList > Globals.pageSize*this.defaultPagination){
          this.upper_count = Globals.pageSize*this.defaultPagination
        }
        else{
          this.upper_count = this.totalcompanyStorageList
        }

        this.spinner.hide();
      }
    );
  };

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getCompanyStorageList(this.route.snapshot.params['id']);
  }

  pagination = function () {
    this.spinner.show();
    this.getCompanyStorageList(this.route.snapshot.params['id']);
  };

}
