import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../core/services/vendor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  vendorList = []
  defaultPagination: number;
  totalvendorList: number;
  search_key = '';
  constructor(
    private router: Router,
    private vendorService: VendorService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.defaultPagination = 1;
    this.getVendorList();
  }

  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  dataSearch() {
    this.defaultPagination = 1;
    this.getVendorList();
  }
  
  getVendorList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.vendorService.getVendorList(params).subscribe(
      (data: any[]) => {
        this.totalvendorList = data['count'];
        this.vendorList = data['results'];
        // console.log(this.vendorList)
      }
    );
  };
  
  activeState(id) {
    let vendor;

    vendor = {
      id: id,
      status: true
    };
    this.vendorService.activeInactiveVendor(vendor).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getVendorList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactiveState(id) {
    let vendor;

    vendor = {
      id: id,
      status: false
    };

    this.vendorService.activeInactiveVendor(vendor).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getVendorList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  deleteVendor(id) {
    let vendor;

    vendor = {
      id: id
    };

    this.vendorService.deleteVendor(vendor).subscribe(
      response => {
        this.toastr.success('Transporter deleted successfully', '', {
          timeOut: 3000,
        });
        this.getVendorList();
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
    this.getVendorList();
  };

}
