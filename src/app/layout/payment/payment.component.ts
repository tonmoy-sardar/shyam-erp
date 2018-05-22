import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.defaultPagination = 1;
    this.getPaymentList();
  }

  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  dataSearch() {
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
        console.log(this.paymentList)
      }
    );
  }


  approvePayment(id) {
    let grn;

    grn = {
      id: id,
      is_approve: 1
    };
    this.paymentService.approveDisapprovePayment(grn).subscribe(
      response => {
        this.toastr.success('Payment approved successfully', '', {
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
  };

  disApprovePayment(id) {
    let grn;

    grn = {
      id: id,
      is_approve: 0
    };

    this.paymentService.approveDisapprovePayment(grn).subscribe(
      response => {
        this.toastr.success('Payment disapproved successfully', '', {
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
  };

  pagination() {
    this.getPaymentList();
  };

}
