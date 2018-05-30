import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { StocksService } from '../../../core/services/stocks.service';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';

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
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private stocksService: StocksService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getStockIssueList();
    this.getHelp();
  }

  getHelp(){
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.stockIssueHistory.heading;
      this.help_description = res.data.stockIssueHistory.desc;
    })
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
      this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
      this.lower_count = this.itemNo + 1;
      if(this.totalStockIssueList > this.itemPerPage*this.defaultPagination){
        this.upper_count = this.itemPerPage*this.defaultPagination
      }
      else{
        this.upper_count = this.totalStockIssueList
      }
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
