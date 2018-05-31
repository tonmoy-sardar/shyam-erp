import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseInvoiceService } from '../../core/services/purchase-invoice.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentService } from '../../core/services/payment.service';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

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

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private purchaseInvoiceService: PurchaseInvoiceService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getpurchaseInvoiceList();
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
    this.defaultPagination = 1;
    this.getpurchaseInvoiceList();
  }

  getpurchaseInvoiceList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
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
        this.spinner.hide();
        // console.log(this.purchaseInvoiceList)        
      }
    );
  }

  changeStatus(value, id) {
    this.spinner.show();
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
          this.getpurchaseInvoiceList();
        },
        error => {
          console.log('error', error)
          // this.toastr.error('everything is broken', '', {
          //   timeOut: 3000,
          // });
        }
      );
    }
  }

  changeApproveStatus(value, pInvoice) {
    if (value > 0) {
      this.spinner.show();
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
            this.getpurchaseInvoiceList();
          }
        },
        error => {
          console.log('error', error)
          // this.toastr.error('everything is broken', '', {
          //   timeOut: 3000,
          // });
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
        this.getpurchaseInvoiceList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  }

  pagination() {
    this.getpurchaseInvoiceList();
  };

}
