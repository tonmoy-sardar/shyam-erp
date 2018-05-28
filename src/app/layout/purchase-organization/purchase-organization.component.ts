import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrganizationService } from '../../core/services/purchase-organization.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

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
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;

  constructor(
    private purchaseOrganizationService: PurchaseOrganizationService,
     private router: Router,
     private toastr: ToastrService,
     private spinner: NgxSpinnerService,
     private helpService: HelpService
    ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.getPurchaseOrganizationList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseOrganization.heading;
      this.help_description = res.data.purchaseOrganization.desc;
    })
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
        this.itemNo = (this.defaultPagination - 1) * Globals.pageSize;
        this.lower_count = this.itemNo + 1;
        if(this.purchaseOrganizationList > Globals.pageSize*this.defaultPagination){
          this.upper_count = Globals.pageSize*this.defaultPagination
        }
        else{
          this.upper_count = this.purchaseOrganizationList
        }
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
