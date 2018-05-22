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

  activeState(id) {
    let PurchaseInvoice;

    PurchaseInvoice = {
      id: id,
      status: true
    };
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
  };

  inactiveState(id) {
    let PurchaseInvoice;

    PurchaseInvoice = {
      id: id,
      status: false
    };

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
  };

  approvePurchaseInvoice(id) {
    let PurchaseInvoice;

    PurchaseInvoice = {
      id: id,
      is_approve: 1
    };
    this.purchaseInvoiceService.approveDisapprovePurchaseInvoice(PurchaseInvoice).subscribe(
      response => {
        this.toastr.success('Purchase invoice approved successfully', '', {
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
  };

  disApprovePurchaseInvoice(id) {
    let PurchaseInvoice;

    PurchaseInvoice = {
      id: id,
      is_approve: 0
    };

    this.purchaseInvoiceService.approveDisapprovePurchaseInvoice(PurchaseInvoice).subscribe(
      response => {
        this.toastr.success('Purchase invoice disapproved successfully', '', {
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
  };

  pagination() {
    this.getpurchaseInvoiceList();
  };

}
