import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseRequisitionService } from '../../core/services/purchase-requisition.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

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
  constructor(
    private router: Router,
    private purchaseRequisitionService: PurchaseRequisitionService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
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
    params.set('search', this.search_key.toString());
    this.purchaseRequisitionService.getPurchaseRequisitionList(params).subscribe(
      (data: any[]) => {
        this.totalPurchaseRequisitionList = data['count'];
        this.purchaseRequisitionList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if(this.totalPurchaseRequisitionList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalPurchaseRequisitionList
        }
        this.spinner.hide();
        // console.log(this.purchaseRequisitionList)
      }
    );
  }

  changeStatus(value, id) {
    this.spinner.show();
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
