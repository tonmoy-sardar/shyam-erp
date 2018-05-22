import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BanksService } from '../../core/services/banks.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit {
  bankList = [];
  defaultPagination: number;
  totalBankList: number;
  search_key = '';
  constructor(
    private router: Router,
    private banksService: BanksService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getBankList();
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getBankList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getBankList(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.banksService.getBankList(params).subscribe(
      (data: any[]) => {
        this.totalBankList = data['count'];
        this.bankList = data['results'];
        this.spinner.hide();
      }
    );
  };

  activeBank (id) {
    this.spinner.show();
    let gstRate;

    gstRate = {
      id: id,
      status: true
    };
    this.banksService.activeInactiveBank(gstRate).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getBankList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactiveBank (id) {
    this.spinner.show();
    let gstRate;

    gstRate = {
      id: id,
      status: false
    };

    this.banksService.activeInactiveBank(gstRate).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getBankList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  deleteBank (id) {
    this.spinner.show();
    let bank;

    bank = {
      id: id
    };

    this.banksService.deleteBank(bank).subscribe(
      response => {
        this.toastr.success('Bank deleted successfully', '', {
          timeOut: 3000,
        });
        this.getBankList();
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
    this.getBankList();
  };

}
