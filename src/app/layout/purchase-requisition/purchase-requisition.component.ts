import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseRequisitionService } from '../../core/services/purchase-requisition.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-purchase-requisition',
  templateUrl: './purchase-requisition.component.html',
  styleUrls: ['./purchase-requisition.component.scss']
})
export class PurchaseRequisitionComponent implements OnInit {
  purchaseRequisitionList = []
  defaultPagination: number;
  totalPurchaseRequisitionList: number;
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
    private router: Router,
    private purchaseRequisitionService: PurchaseRequisitionService,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {

    this.headerThOption = [
      {
        name: "PR No.",
        code: "requisition_map__requisition_no",
        sort_type: '',
        has_tooltip: true,
        tooltip_msg: 'Purchase Requisition Number'
      },
      {
        name: "Company",
        code: "company__company_name",
        sort_type: '',
        has_tooltip: false,
        tooltip_msg: ''
      },
      {
        name: "P. Org.",
        code: "purchase_org__name",
        sort_type: '',
        has_tooltip: true,
        tooltip_msg: 'Purchase Organisation'
      },
      {
        name: "P. Group",
        code: "purchase_grp__name",
        sort_type: '',
        has_tooltip: true,
        tooltip_msg: 'Purchase Group'
      },
      {
        name: "PR Raised Date",
        code: "created_at",
        sort_type: '',
        has_tooltip: true,
        tooltip_msg: 'Purchase Requisition Raised Date'
      },
      {
        name: "PR Raised By",
        code: "created_by__first_name",
        sort_type: '',
        has_tooltip: true,
        tooltip_msg: 'Purchase Requisition Raised By'
      }
    ];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getPurchaseRequisitionList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseRequisition.heading;
      this.help_description = res.data.purchaseRequisition.desc;
    })
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getPurchaseRequisitionList() {
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
    this.purchaseRequisitionService.getPurchaseRequisitionList(params).subscribe(
      (data: any[]) => {
        this.totalPurchaseRequisitionList = data['count'];
        this.purchaseRequisitionList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalPurchaseRequisitionList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalPurchaseRequisitionList
        }
        this.loading = LoadingState.Ready;
        // console.log(this.purchaseRequisitionList)
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

  changeStatus(value, id) {
    this.loading = LoadingState.Processing;
    let purchaseRequisition;
    if (value != "") {
      if (value == 0) {
        purchaseRequisition = {
          id: id,
          status: false
        };
      }
      else if (value == 1) {
        purchaseRequisition = {
          id: id,
          status: true
        };
      }
      this.purchaseRequisitionService.changeStatusPurchaseRequisition(purchaseRequisition).subscribe(
        response => {
          this.toastr.success('Status changed successfully', '', {
            timeOut: 3000,
          });
          this.getPurchaseRequisitionList();
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    }
  }

  changeApproveStatus(value, id) {
    if (value > 0) {
      this.loading = LoadingState.Processing;
      let purchaseRequisition;

      purchaseRequisition = {
        id: id,
        is_approve: value
      };

      this.purchaseRequisitionService.changeApproveStatusPurchaseRequisition(purchaseRequisition).subscribe(
        response => {
          this.toastr.success('Purchase Requisition approve status changed successfully', '', {
            timeOut: 3000,
          });
          this.getPurchaseRequisitionList();
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    }

  }

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getPurchaseRequisitionList();
  }
  pagination() {
    this.loading = LoadingState.Processing;
    this.getPurchaseRequisitionList();
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
    this.getPurchaseRequisitionList();
  };

}
