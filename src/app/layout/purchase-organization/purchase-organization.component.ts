import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrganizationService } from '../../core/services/purchase-organization.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purchase-organization',
  templateUrl: './purchase-organization.component.html',
  styleUrls: ['./purchase-organization.component.scss']
})
export class PurchaseOrganizationComponent implements OnInit {
  purchaseOrganizationList = [];
  totalPurchaseOrganizationList: number;
  defaultPagination: number;
  search_key = '';
  constructor(
    private purchaseOrganizationService: PurchaseOrganizationService,
     private router: Router,
     private toastr: ToastrService,
     private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getPurchaseOrganizationList();
  }

  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };
  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getPurchaseOrganizationList();
  }
  getPurchaseOrganizationList= function(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.purchaseOrganizationService.getPurchaseOrganizationList(params).subscribe(
      (data: any[]) =>{   
        this.purchaseOrganizationList = data['results'];
        this.totalPurchaseOrganizationList = data['count'];
        this.spinner.hide();
      }
     );
  };

  activePurchaseOrganization = function(id){
    this.spinner.show();
    let purchaseOrganization;

    purchaseOrganization = {
      id: id,
      status: true
    };
    this.purchaseOrganizationService.activeInactivePurchaseOrganization(purchaseOrganization).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getPurchaseOrganizationList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactivePurchaseOrganization = function(id){
    this.spinner.show();
    let purchaseOrganization;

    purchaseOrganization = {
      id: id,
      status: false
    };

    this.purchaseOrganizationService.activeInactivePurchaseOrganization(purchaseOrganization).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getPurchaseOrganizationList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };
  pagination = function () {
    this.spinner.show();
    this.getPurchaseOrganizationList();
  };

}
