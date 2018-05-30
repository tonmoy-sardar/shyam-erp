import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../core/services/vendor.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  vendorList = []
  defaultPagination: number;
  totalVendorList: number;
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
    private vendorService: VendorService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getVendorList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.vendor.heading;
      this.help_description = res.data.vendor.desc;
    })
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getVendorList();
  }
  
  getVendorList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.vendorService.getVendorList(params).subscribe(
      (data: any[]) => {
        this.totalVendorList = data['count'];
        this.vendorList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if(this.totalVendorList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalVendorList
        }
        this.spinner.hide();
      }
    );
  };
  
  activeState(id) {
    this.spinner.show();
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
    this.spinner.show();
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
    this.spinner.show();
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
    this.spinner.show();
    this.getVendorList();
  };

}
