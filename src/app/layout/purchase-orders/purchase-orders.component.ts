import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrdersService } from '../../core/services/purchase-orders.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../core/services/company.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {
  purchaseOrderList = []
  defaultPagination: number;
  totalpurchaseOrderList: number;
  search_key = '';
  companyList = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private purchaseOrdersService: PurchaseOrdersService,
    private companyService: CompanyService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getPurchaseOrderList();
    this.getCompanyList()
  }

  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  dataSearch() {
    this.spinner.show();
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
  
  getPurchaseOrderList(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.purchaseOrdersService.getPurchaseOrderList(params).subscribe(
      (data: any[]) => {
        this.totalpurchaseOrderList = data['count'];
        this.purchaseOrderList = data['results'];
        this.spinner.hide();
      }
    );
  }

  activeState(id) {
    this.spinner.show();
    let PurchaseOrder;

    PurchaseOrder = {
      id: id,
      status: true
    };
    this.purchaseOrdersService.activeInactivePurchaseOrder(PurchaseOrder).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getPurchaseOrderList();
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
    this.spinner.show();
    let PurchaseOrder;

    PurchaseOrder = {
      id: id,
      status: false
    };

    this.purchaseOrdersService.activeInactivePurchaseOrder(PurchaseOrder).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getPurchaseOrderList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  approvePurchaseOrder(id) {
    this.spinner.show();
    let PurchaseOrder;

    PurchaseOrder = {
      id: id,
      is_approve: 1
    };
    this.purchaseOrdersService.approveDisapprovePurchaseOrder(PurchaseOrder).subscribe(
      response => {
        this.toastr.success('Purchase order approved successfully', '', {
          timeOut: 3000,
        });
        this.getPurchaseOrderList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  disApprovePurchaseOrder(id) {
    this.spinner.show();
    let PurchaseOrder;

    PurchaseOrder = {
      id: id,
      is_approve: 0
    };

    this.purchaseOrdersService.approveDisapprovePurchaseOrder(PurchaseOrder).subscribe(
      response => {
        this.toastr.success('Purchase order disapproved successfully', '', {
          timeOut: 3000,
        });
        this.getPurchaseOrderList();
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
    this.spinner.show();
    this.getPurchaseOrderList();
  };

}
