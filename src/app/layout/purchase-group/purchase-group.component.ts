import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseGroupService } from '../../core/services/purchase-group.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    private purchaseGroupService: PurchaseGroupService
    , private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.defaultPagination = 1;
    this.getPurchaseGroupList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  dataSearch() {
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
      }
    );
  };

  activePurchaseGroup = function (id) {
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
    this.getPurchaseGroupList();
  };
}
