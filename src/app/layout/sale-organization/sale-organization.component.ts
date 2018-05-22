import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleOrganizationService } from '../../core/services/sale-organization.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sale-organization',
  templateUrl: './sale-organization.component.html',
  styleUrls: ['./sale-organization.component.scss']
})
export class SaleOrganizationComponent implements OnInit {
  saleOrganizationList = [];
  defaultPagination: number;
  totalsaleOrganizationList: number;
  search_key = '';
  constructor(
    private saleOrganizationService: SaleOrganizationService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.defaultPagination = 1;
    this.getSaleOrganizationList();
  }
  dataSearch() {
    this.defaultPagination = 1;
    this.getSaleOrganizationList();
  }
  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getSaleOrganizationList = function () {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.saleOrganizationService.getSaleOrganizationList(params).subscribe(
      (data: any[]) => {
        this.totalsaleOrganizationList = data['count'];
        this.saleOrganizationList = data['results'];
      }
    );
  };

  activeSaleOrganization = function (id) {
    let saleOrganization;

    saleOrganization = {
      id: id,
      status: true
    };
    this.saleOrganizationService.activeInactiveSaleOrganization(saleOrganization).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getSaleOrganizationList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactiveSaleOrganization = function (id) {
    let saleOrganization;

    saleOrganization = {
      id: id,
      status: false
    };

    this.saleOrganizationService.activeInactiveSaleOrganization(saleOrganization).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getSaleOrganizationList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  pagination = function () {
    this.getSaleOrganizationList();
  };
}
