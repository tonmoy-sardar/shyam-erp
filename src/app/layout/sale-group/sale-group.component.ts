import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleGroupService } from '../../core/services/sale-group.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sale-group',
  templateUrl: './sale-group.component.html',
  styleUrls: ['./sale-group.component.scss']
})
export class SaleGroupComponent implements OnInit {
  saleGroupList = [];
  defaultPagination: number;
  totalsaleGroupList: number;
  search_key = '';
  constructor(
    private saleGroupService: SaleGroupService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getSaleGroupList();
  }
  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getSaleGroupList();
  }
  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  getSaleGroupList= function(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.saleGroupService.getSaleGroupList(params).subscribe(
      (data: any[]) =>{
        this.totalsaleGroupList = data['count'];   
        this.saleGroupList = data['results'];
        this.spinner.hide();
      }
     );
  };

  activeSaleGroup = function(id){
    this.spinner.show();
    let saleGroup;

    saleGroup = {
      id: id,
      status: true
    };
    this.saleGroupService.activeInactivePurchaseGroup(saleGroup).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getSaleGroupList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactiveSaleGroup = function(id){
    this.spinner.show();
    let saleGroup;

    saleGroup = {
      id: id,
      status: false
    };

    this.saleGroupService.activeInactiveSaleGroup(saleGroup).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getSaleGroupList();
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
    this.getSaleGroupList();
  };
}
