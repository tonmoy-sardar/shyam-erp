import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrdersService } from '../../core/services/purchase-orders.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../core/services/company.service';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {
  purchaseOrderList = []
  defaultPagination: number;
  totalPurchaseOrderList: number;
  search_key = '';
  companyList = [];
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;

  sort_by = '';
  sort_type= '';
  headerThOption = [];
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private purchaseOrdersService: PurchaseOrdersService,
    private companyService: CompanyService,
    private helpService: HelpService
  ) { }

  ngOnInit() {

    this.headerThOption = [
      {  
        name: "PO. No.",
        code: "purchase_order_map__purchase_order_no",
        sort_type:'',
        has_tooltip:true,
        tooltip_msg:'Purchase Order Number'
      },
      {  
        name: "PR. No.",
        code: "requisition__requisition_map__requisition_no",
        sort_type:'',
        has_tooltip:true,
        tooltip_msg:'Purchase Requisition Number'
      },
      {  
        name: "PO. Amount",
        code: "grand_total",
        sort_type:'',
        has_tooltip:true,
        tooltip_msg:'Purchase Order Amount'
      },
      {  
        name: "Company",
        code: "company__company_name",
        sort_type:'',
        has_tooltip:false,
        tooltip_msg:''
      },
      {  
        name: "Branch",
        code: "purchase_order_detail__company_branch__branch_address",
        sort_type:'',
        has_tooltip:false,
        tooltip_msg:''
      },
      {  
        name: "Storage",
        code: "purchase_order_detail__storage_location__storage_address",
        sort_type:'',
        has_tooltip:false,
        tooltip_msg:''
      },
      {  
        name: "Bin",
        code: "purchase_order_detail__storage_bin__bin_no",
        sort_type:'',
        has_tooltip:false,
        tooltip_msg:''
      },
      {  
        name: "PO. Raised Date",
        code: "quotation_date",
        sort_type:'',
        has_tooltip:true,
        tooltip_msg:'Purchase Order Raised Date'
      },
    ];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getPurchaseOrderList();
    this.getCompanyList()
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseOrder.heading;
      this.help_description = res.data.purchaseOrder.desc;
    })
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getPurchaseOrderList();
  }
  getCompanyList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;
      }
    );
  };

  getPurchaseOrderList() {
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
    this.purchaseOrdersService.getPurchaseOrderList(params).subscribe(
      (data: any[]) => {
        this.totalPurchaseOrderList = data['count'];
        this.purchaseOrderList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if(this.totalPurchaseOrderList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalPurchaseOrderList
        }
        this.loading = LoadingState.Ready;
        // console.log(this.purchaseOrderList)
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
    let PurchaseOrder;
    if (value != "") {
      if (value == 0) {
        PurchaseOrder = {
          id: id,
          status: false
        };
      }
      else if (value == 1) {
        PurchaseOrder = {
          id: id,
          status: true
        };
      }
      this.purchaseOrdersService.activeInactivePurchaseOrder(PurchaseOrder).subscribe(
        response => {
          this.toastr.success('Status changed successfully', '', {
            timeOut: 3000,
          });
          this.getPurchaseOrderList();
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
      let PurchaseOrder;

      PurchaseOrder = {
        id: id,
        is_approve: value
      };

      this.purchaseOrdersService.approveDisapprovePurchaseOrder(PurchaseOrder).subscribe(
        response => {
          this.toastr.success('Purchase order approve status changed successfully', '', {
            timeOut: 3000,
          });
          this.getPurchaseOrderList();
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


  pagination() {
    this.loading = LoadingState.Processing;
    this.getPurchaseOrderList();
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
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getPurchaseOrderList();
  };

}
