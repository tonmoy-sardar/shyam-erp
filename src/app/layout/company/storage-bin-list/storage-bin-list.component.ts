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
  totalCompanyStorageBinList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;

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
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
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

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  showStorageBinAdd() {
    this.companyStorageBinCompShow = {
      showList: false,
      showAdd: true,
      showEdit: false
    };
  };

  showStorageBinEdit(id) {
    this.companyStorageBinId = id;
    this.companyStorageBinCompShow = {
      showList: false,
      showAdd: false,
      showEdit: true
    };
  };

  reloadStorageBinList() {
    this.companyStorageBinCompShow = {
      showList: true,
      showAdd: false,
      showEdit: false
    };

    this.getCompanyStorageBinList(this.route.snapshot.params['id']);
  }

  getCompanyStorageBinList(id) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.companyService.getCompanyStorageBinList(id,params).subscribe(
      (data: any[]) => {
        this.companyStorageBinList = data['results'];
        this.totalCompanyStorageBinList = data['count'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;

        if(this.totalCompanyStorageBinList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalCompanyStorageBinList
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

  pagination() {
    this.spinner.show();
    this.getCompanyStorageBinList(this.route.snapshot.params['id']);
  };


}
