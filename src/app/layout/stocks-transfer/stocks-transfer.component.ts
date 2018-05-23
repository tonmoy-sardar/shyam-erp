import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-stocks-transfer',
  templateUrl: './stocks-transfer.component.html',
  styleUrls: ['./stocks-transfer.component.scss']
})
export class StocksTransferComponent implements OnInit {

  stocksTransferList = [];
  itemNo:number;
  defaultPagination: number;
  totalstocksTransferList: number;
  search_key = '';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.getStocksTransferList();
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getStocksTransferList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getStocksTransferList(){
    this.spinner.hide();
  }

  pagination() {
    this.itemNo = (this.defaultPagination - 1) * 10;
    this.spinner.show();
    this.getStocksTransferList();
  };

}
