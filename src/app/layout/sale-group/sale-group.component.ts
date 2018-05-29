import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleGroupService } from '../../core/services/sale-group.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-sale-group',
  templateUrl: './sale-group.component.html',
  styleUrls: ['./sale-group.component.scss']
})
export class SaleGroupComponent implements OnInit {
  saleGroupList = [];
  defaultPagination: number;
  totalSaleGroupList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  constructor(
    private saleGroupService: SaleGroupService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getSaleGroupList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.saleGroup.heading;
      this.help_description = res.data.saleGroup.desc;
    })
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getSaleGroupList();
  }
  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  getSaleGroupList(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.saleGroupService.getSaleGroupList(params).subscribe(
      (data: any[]) =>{
        this.totalSaleGroupList = data['count'];   
        this.saleGroupList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;

        if(this.totalSaleGroupList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalSaleGroupList
        }

        this.spinner.hide();
      }
     );
  };

  activeSaleGroup(id){
    this.spinner.show();
    let saleGroup;

    saleGroup = {
      id: id,
      status: true
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

  inactiveSaleGroup(id){
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

  pagination() {
    this.spinner.show();
    this.getSaleGroupList();
  };
}
