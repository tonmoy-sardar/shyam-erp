import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrdersService } from '../../core/services/purchase-orders.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../core/services/company.service';

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
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.defaultPagination = 1;
    this.getPurchaseOrderList();
    this.getCompanyList()
  }

  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  dataSearch() {
    this.defaultPagination = 1;
    this.getPurchaseOrderList();
  }
  getCompanyList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;
        // console.log(this.companyList);
      }
    );
  };
  // getCompanyName(id) {
  //   var data = { id: 0, company_name: '' }
  //   data = this.companyList.filter(x => x.id === id)[0];
  //   if (data != undefined) {
  //     return data.company_name
  //   }
  // }
  getPurchaseOrderList(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.purchaseOrdersService.getPurchaseOrderList(params).subscribe(
      (data: any[]) => {
        this.totalpurchaseOrderList = data['count'];
        this.purchaseOrderList = data['results'];
        // console.log(this.purchaseOrderList)
      }
    );
  }

  activeState(id) {
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
    this.getPurchaseOrderList();
  };

}
