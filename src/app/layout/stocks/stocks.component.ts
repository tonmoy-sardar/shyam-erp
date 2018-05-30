import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { StocksService } from '../../core/services/stocks.service';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  stockList = [];
  itemNo: number;
  defaultPagination: number;
  totalStockList: number;
  search_key = '';
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private stocksService: StocksService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.getStockList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.stock.heading;
      this.help_description = res.data.stock.desc;
    })
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getStockList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getStockList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.stocksService.getStockList(params).subscribe(res => {
      this.totalStockList = res['count'];
      this.stockList = res['results'];
      this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
      this.lower_count = this.itemNo + 1;
      if (this.totalStockList > this.itemPerPage * this.defaultPagination) {
        this.upper_count = this.itemPerPage * this.defaultPagination
      }
      else {
        this.upper_count = this.totalStockList
      }
      this.spinner.hide();
      // console.log(this.stockList)
    })
  }

  pagination() {
    this.itemNo = (this.defaultPagination - 1) * 10;
    this.spinner.show();
    this.getStockList();
  };

}
