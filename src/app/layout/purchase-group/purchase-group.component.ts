import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseGroupService } from '../../core/services/purchase-group.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-purchase-group',
  templateUrl: './purchase-group.component.html',
  styleUrls: ['./purchase-group.component.scss']
})
export class PurchaseGroupComponent implements OnInit {
  purchaseGroupList = [];
  defaultPagination: number;
  totalpurchaseGroupList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  constructor(
    private purchaseGroupService: PurchaseGroupService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.getPurchaseGroupList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseGroup.heading;
      this.help_description = res.data.purchaseGroup.desc;
    })
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getPurchaseGroupList();
  }
  getPurchaseGroupList = function () {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.purchaseGroupService.getPurchaseGroupList(params).subscribe(
      (data: any[]) => {
        this.totalpurchaseGroupList = data['count'];
        this.purchaseGroupList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * Globals.pageSize;
        this.lower_count = this.itemNo + 1;

        if(this.totalpurchaseGroupList > Globals.pageSize*this.defaultPagination){
          this.upper_count = Globals.pageSize*this.defaultPagination
        }
        else{
          this.upper_count = this.totalpurchaseGroupList
        }
        this.spinner.hide();
      }
    );
  };

  activePurchaseGroup = function (id) {
    this.spinner.show();
    let purchaseGroup;

    purchaseGroup = {
      id: id,
      status: true
    };
    this.purchaseGroupService.activeInactivePurchaseGroup(purchaseGroup).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getPurchaseGroupList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactivePurchaseGroup = function (id) {
    this.spinner.show();
    let purchaseGroup;

    purchaseGroup = {
      id: id,
      status: false
    };

    this.purchaseGroupService.activeInactivePurchaseGroup(purchaseGroup).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getPurchaseGroupList();
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
    this.getPurchaseGroupList();
  };
}
