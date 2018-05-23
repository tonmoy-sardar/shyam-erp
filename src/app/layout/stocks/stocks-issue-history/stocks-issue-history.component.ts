import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { StocksService } from '../../../core/services/stocks.service';

@Component({
  selector: 'app-stocks-issue-history',
  templateUrl: './stocks-issue-history.component.html',
  styleUrls: ['./stocks-issue-history.component.scss']
})
export class StocksIssueHistoryComponent implements OnInit {

  stockIssueList = [];
  itemNo: number;
  defaultPagination: number;
  totalStockIssueList: number;
  search_key = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private stocksService: StocksService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.getStockIssueList();
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getStockIssueList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getStockIssueList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.stocksService.getStockIssueHistoryList(params,this.route.snapshot.params['id']).subscribe(res => {      
      this.totalStockIssueList = res['count'];
      this.stockIssueList = res['results'];
      this.spinner.hide();
      // console.log(this.stockIssueList)
    })
  }

  pagination() {
    this.itemNo = (this.defaultPagination - 1) * 10;
    this.spinner.show();
    this.getStockIssueList();
  };

}
