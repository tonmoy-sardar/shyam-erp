import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GstRatesService } from '../../core/services/gst-rates.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gst-rates',
  templateUrl: './gst-rates.component.html',
  styleUrls: ['./gst-rates.component.scss']
})
export class GstRatesComponent implements OnInit {
  gstRatesList = [];
  defaultPagination: number;
  totalgstRatesList: number;
  search_key = '';
  constructor(
    private router: Router,
    private gstRatesService: GstRatesService,
    private toastr: ToastrService
  ) { }


  ngOnInit() {
    this.defaultPagination = 1;
    this.getGstList();
  }

  dataSearch() {
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
        this.totalgstRatesList = data['count'];
        this.gstRatesList = data['results'];
        // console.log(this.gstRatesList)
      }
    );
  };

  activeGst (id) {
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
    this.getGstList();
  };

}
