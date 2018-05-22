import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseRequisitionService } from '../../core/services/purchase-requisition.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
  constructor(
    private router: Router,
    private purchaseRequisitionService: PurchaseRequisitionService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getPurchaseRequisitionList();
  }

  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  getPurchaseRequisitionList(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.purchaseRequisitionService.getPurchaseRequisitionList(params).subscribe(
      (data: any[]) => {
        this.totalPurchaseRequisitionList = data['count'];
        this.purchaseRequisitionList = data['results'];
        this.spinner.hide();
      }
    );
  }

  changeStatus(value,id){
    this.spinner.show();
    let purchaseRequisition;

    purchaseRequisition = {
      id: id,
      is_finalised: value
    };

    this.purchaseRequisitionService.changeStatusPurchaseRequisition(purchaseRequisition).subscribe(
      response => {
        this.toastr.success('Purchase Requisition status changed successfully', '', {
          timeOut: 3000,
        });
        this.getPurchaseRequisitionList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  }

  changeApproveStatus(value,id){
    this.spinner.show();
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
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getPurchaseRequisitionList();
  }
  pagination() {
    this.spinner.show();
    this.getPurchaseRequisitionList();
  };
}
