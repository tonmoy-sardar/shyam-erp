import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentList = []
  defaultPagination: number;
  totalPaymentList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private paymentService: PaymentService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getPaymentList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.payment.heading;
      this.help_description = res.data.payment.desc;
    })
  }

  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getPaymentList();
  }

  getPaymentList(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.paymentService.getPaymentList(params).subscribe(
      (data: any[]) => {
        this.totalPaymentList = data['count'];
        this.paymentList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if(this.totalPaymentList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalPaymentList
        }
        // console.log(this.paymentList)
        this.spinner.hide();
      }
    );
  }

  changeStatus(value, id) {
    this.spinner.show();
    let payment;
    if (value != "") {
      if (value == 0) {
        payment = {
          id: id,
          status: false
        };
      }
      else if (value == 1) {
        payment = {
          id: id,
          status: true
        };
      }
      this.paymentService.activeInactivePayment(payment).subscribe(
        response => {
          this.toastr.success('Status changed successfully', '', {
            timeOut: 3000,
          });
          this.getPaymentList();
        },
        error => {
          console.log('error', error)
          // this.toastr.error('everything is broken', '', {
          //   timeOut: 3000,
          // });
        }
      );
    }
  }

  changeApproveStatus(value, id) {    
    if (value > 0) {
            
      this.spinner.show();
      let payment;
      payment = {
        id: id,
        is_approve: value
      };

      this.paymentService.approveDisapprovePayment(payment).subscribe(
        response => {
          this.toastr.success('Payment approve status changed successfully', '', {
            timeOut: 3000,
          });
          this.getPaymentList();         
        },
        error => {
          console.log('error', error)
          // this.toastr.error('everything is broken', '', {
          //   timeOut: 3000,
          // });
        }
      );
    }

  }

  pagination() {
    this.spinner.show();
    this.getPaymentList();
  };

}
