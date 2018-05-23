import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { StocksService } from '../../core/services/stocks.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  stockList = [];
  itemNo: number;
  defaultPagination: number;
  totalstockList: number;
  search_key = '';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private stocksService: StocksService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.getStockList();
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
      this.totalstockList = res['count'];
      this.stockList = res['results'];
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
