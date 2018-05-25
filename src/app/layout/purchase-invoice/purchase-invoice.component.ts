import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseInvoiceService } from '../../core/services/purchase-invoice.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.scss']
})
export class PurchaseInvoiceComponent implements OnInit {
  purchaseInvoiceList = []
  defaultPagination: number;
  totalurchaseInvoiceList: number;
  search_key = '';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private purchaseInvoiceService: PurchaseInvoiceService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.defaultPagination = 1;
    this.getpurchaseInvoiceList();
    this.spinner.show();
  }

  btnClickNav = function (toNav) {
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
        this.totalurchaseInvoiceList = data['count'];
        this.purchaseInvoiceList = data['results'];
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

  changeApproveStatus(value, id) {
    if (value > 0) {
      this.spinner.show();
      let PurchaseInvoice;

      PurchaseInvoice = {
        id: id,
        is_approve: value
      };

      this.purchaseInvoiceService.approveDisapprovePurchaseInvoice(PurchaseInvoice).subscribe(
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

  }

  pagination() {
    this.getpurchaseInvoiceList();
  };

}
