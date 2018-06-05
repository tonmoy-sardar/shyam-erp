import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseInvoiceService } from '../../core/services/purchase-invoice.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../core/services/payment.service';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.scss']
})
export class PurchaseInvoiceComponent implements OnInit {
  purchaseInvoiceList = []
  defaultPagination: number;
  totalPurchaseInvoiceList: number;
  search_key = '';
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
    private purchaseInvoiceService: PurchaseInvoiceService,
    private helpService: HelpService,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {

    this.headerThOption = [
      {  
        name: "Company",
        code: "company__company_name",
        sort_type:'',
        has_tooltip:false,
        tooltip_msg:''
      },
      {  
        name: "PO. INV. No.",
        code: "pur_invoice_map__purchase_inv_no",
        sort_type:'',
        has_tooltip:true,
        tooltip_msg:'Purchase Order Invoice Number'
      },
      {  
        name: "GRN No.",
        code: "grn__grn_map__grn_no",
        sort_type:'',
        has_tooltip:false,
        tooltip_msg:''
      },
      {  
        name: "PO. No.",
        code: "po_order__purchase_order_map__purchase_order_no",
        sort_type:'',
        has_tooltip:true,
        tooltip_msg:'Purchase Order Number'
      },
      {  
        name: "Goods Recd ON",
        code: "grn__created_at",
        sort_type:'',
        has_tooltip:false,
        tooltip_msg:''
      },
      {  
        name: "Goods Received BY",
        code: "grn__created_by__first_name",
        sort_type:'',
        has_tooltip:false,
        tooltip_msg:''
      }
    ];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getPurchaseInvoiceList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseInvoice.heading;
      this.help_description = res.data.purchaseInvoice.desc;
    })
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getPurchaseInvoiceList();
  }

  getPurchaseInvoiceList() {
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
    this.purchaseInvoiceService.getPurchaseInvoiceList(params).subscribe(
      (data: any[]) => {
        this.totalPurchaseInvoiceList = data['count'];
        this.purchaseInvoiceList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalPurchaseInvoiceList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalPurchaseInvoiceList
        }
        this.loading = LoadingState.Ready;
        // console.log(this.purchaseInvoiceList)        
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
    let PurchaseInvoice;
    if (value != "") {
      if (value == 0) {
        PurchaseInvoice = {
          id: id,
          status: false
        };
      }
      else if (value == 1) {
        PurchaseInvoice = {
          id: id,
          status: true
        };
      }
      this.purchaseInvoiceService.activeInactivePurchaseInvoice(PurchaseInvoice).subscribe(
        response => {
          this.toastr.success('Status changed successfully', '', {
            timeOut: 3000,
          });
          this.getPurchaseInvoiceList();
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

  changeApproveStatus(value, pInvoice) {
    if (value > 0) {
      this.loading = LoadingState.Processing;
      let PurchaseInvoice;

      PurchaseInvoice = {
        id: pInvoice.id,
        is_approve: value
      };

      this.purchaseInvoiceService.approveDisapprovePurchaseInvoice(PurchaseInvoice).subscribe(
        response => {
          if (value == 1) {
            this.paymentCreation(pInvoice);
          }
          else {
            this.toastr.success('Purchase invoice approve status changed successfully', '', {
              timeOut: 3000,
            });
            this.getPurchaseInvoiceList();
          }
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

  paymentCreation(pInvoice) {
    var payment = {
      company: pInvoice.company.id,
      pur_inv: pInvoice.id,
      total_amount: pInvoice.total_amount,
      po_order: pInvoice.po_order_no[0].id,
      po_order_no: pInvoice.po_order_no[0].purchase_order_no,
      purchase_inv_date: pInvoice.created_at,
      purchase_inv_no: pInvoice.pur_invoice_map[0].purchase_inv_no,
      vendor: pInvoice.vendor.id,
      vendor_address: pInvoice.vendor_address.id
    };

    this.paymentService.addNewPayment(payment).subscribe(
      response => {
        this.toastr.success('Purchase invoice approve status changed successfully', '', {
          timeOut: 3000,
        });
        this.getPurchaseInvoiceList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

  pagination() {
    this.loading = LoadingState.Processing;
    this.getPurchaseInvoiceList();
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
    this.getPurchaseInvoiceList();
  };

}
