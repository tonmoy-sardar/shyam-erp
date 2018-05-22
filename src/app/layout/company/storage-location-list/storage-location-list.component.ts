import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CompanyService } from '../../../core/services/company.service';
import { StatesService } from '../../../core/services/states.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    private companyService: CompanyService,
    private statesService: StatesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.defaultPagination = 1;
    this.companyStorageCompShow = {
      showList: true,
      showAdd: false,
      showEdit: false
    };

    this.getCompanyStorageList(this.route.snapshot.params['id']);
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
        // console.log(this.companyStorageList);
      }
    );
  };

  dataSearch() {
    this.defaultPagination = 1;
    this.getCompanyStorageList(this.route.snapshot.params['id']);
  }

  pagination = function () {
    this.getCompanyStorageList(this.route.snapshot.params['id']);
  };

}
