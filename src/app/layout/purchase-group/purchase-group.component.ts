import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseGroupService } from '../../core/services/purchase-group.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-purchase-group',
  templateUrl: './purchase-group.component.html',
  styleUrls: ['./purchase-group.component.scss']
})
export class PurchaseGroupComponent implements OnInit {
  purchaseGroupList = [];
  defaultPagination: number;
  totalPurchaseGroupList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;

  sort_by = '';
  sort_type = '';
  headerThOption = [];
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private purchaseGroupService: PurchaseGroupService,
    private router: Router,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.headerThOption = [
      {
        name: "Group Name",
        code: "name",
        sort_type: ''
      },
      {
        name: "Group Description",
        code: "description",
        sort_type: ''
      },
      {
        name: "Status",
        code: "status",
        sort_type: ''
      }
    ];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getPurchaseGroupList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseGroup.heading;
      this.help_description = res.data.purchaseGroup.desc;
    })
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getPurchaseGroupList();
  }
  getPurchaseGroupList = function () {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if (this.search_key != '') {
      params.set('search', this.search_key.toString());
    }
    if (this.sort_by != '') {
      params.set('field_name', this.sort_by.toString());
    }

    if (this.sort_type != '') {
      params.set('order_by', this.sort_type.toString());
    }
    this.purchaseGroupService.getPurchaseGroupList(params).subscribe(
      (data: any[]) => {
        this.totalPurchaseGroupList = data['count'];
        this.purchaseGroupList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;

        if (this.totalPurchaseGroupList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalPurchaseGroupList
        }
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  activePurchaseGroup = function (id) {
    this.loading = LoadingState.Processing;
    let purchaseGroup;

    purchaseGroup = {
      id: id,
      status: true
    };
    this.purchaseGroupService.activeInactivePurchaseGroup(purchaseGroup).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getPurchaseGroupList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  inactivePurchaseGroup = function (id) {
    this.loading = LoadingState.Processing;
    let purchaseGroup;

    purchaseGroup = {
      id: id,
      status: false
    };

    this.purchaseGroupService.activeInactivePurchaseGroup(purchaseGroup).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getPurchaseGroupList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };
  pagination = function () {
    this.loading = LoadingState.Processing;
    this.getPurchaseGroupList();
  };

  sortTable(value) {
    let type = '';
    this.headerThOption.forEach(function (optionValue) {
      if (optionValue.code == value) {
        if (optionValue.sort_type == 'desc') {
          type = 'asc';
        }
        else {
          type = 'desc';
        }
        optionValue.sort_type = type;
      }
      else {
        optionValue.sort_type = '';
      }
    });

    this.sort_by = value;
    this.sort_type = type;
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getPurchaseGroupList();
  };

}
