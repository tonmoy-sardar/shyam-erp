import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorTypeService } from '../../core/services/vendor-type.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-vendor-type',
  templateUrl: './vendor-type.component.html',
  styleUrls: ['./vendor-type.component.scss']
})
export class VendorTypeComponent implements OnInit {
  vendorTypeList = [];  
  defaultPagination: number;
  totalVendorTypeList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;

  constructor(
    private vendorTypeService: VendorTypeService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getVendorTypeList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.vendorType.heading;
      this.help_description = res.data.vendorType.desc;
    })

  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getVendorTypeList();
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getVendorTypeList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.vendorTypeService.getVendorTypeList(params).subscribe( 
      (data: any[]) => {
        this.totalVendorTypeList = data['count'];
        this.vendorTypeList = data['results'];
       
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if(this.totalVendorTypeList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalVendorTypeList
        }
        this.spinner.hide();
      }
    );
  };

  activeVendorType(id) {
    this.spinner.show();
    let vendorType;

    vendorType = {
      id: id,
      status: true
    };
    this.vendorTypeService.activeInactiveVendorType(vendorType).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getVendorTypeList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactiveVendorType(id) {
    this.spinner.show();
    let vendorType;

    vendorType = {
      id: id,
      status: false
    };

    this.vendorTypeService.activeInactiveVendorType(vendorType).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getVendorTypeList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  deleteVendorType(id) {
    this.spinner.show();
    let vendorType;

    vendorType = {
      id: id
    };

    this.vendorTypeService.deleteVendorType(vendorType).subscribe(
      response => {
        this.toastr.success('Vendor type deleted successfully', '', {
          timeOut: 3000,
        });
        this.getVendorTypeList();
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
    this.getVendorTypeList();
  };

}
