import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GstRatesService } from '../../core/services/gst-rates.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-gst-rates',
  templateUrl: './gst-rates.component.html',
  styleUrls: ['./gst-rates.component.scss']
})
export class GstRatesComponent implements OnInit {
  gstRatesList = [];
  defaultPagination: number;
  totalGstRatesList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  constructor(
    private router: Router,
    private gstRatesService: GstRatesService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }


  ngOnInit() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.getGstList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.gst.heading;
      this.help_description = res.data.gst.desc;
    })
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getGstList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getGstList(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.gstRatesService.getGSTList(params).subscribe(
      (data: any[]) => {
        this.totalGstRatesList = data['count'];
        this.gstRatesList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * Globals.pageSize;
        this.lower_count = this.itemNo + 1;
        if(this.totalGstRatesList > Globals.pageSize*this.defaultPagination){
          this.upper_count = Globals.pageSize*this.defaultPagination
        }
        else{
          this.upper_count = this.totalGstRatesList
        }
        this.spinner.hide();
      }
    );
  };

  activeGst (id) {
    this.spinner.show();
    let gstRate;

    gstRate = {
      id: id,
      status: true
    };
    this.gstRatesService.activeInactiveGST(gstRate).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getGstList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactiveGst (id) {
    this.spinner.show();
    let gstRate;

    gstRate = {
      id: id,
      status: false
    };

    this.gstRatesService.activeInactiveGST(gstRate).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getGstList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  deleteGST (id) {
    this.spinner.show();
    let gstRate;

    gstRate = {
      id: id
    };

    this.gstRatesService.deleteGST(gstRate).subscribe(
      response => {
        this.toastr.success('GST rate deleted successfully', '', {
          timeOut: 3000,
        });
        this.getGstList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  pagination () {
    this.spinner.show();
    this.getGstList();
  };

}
