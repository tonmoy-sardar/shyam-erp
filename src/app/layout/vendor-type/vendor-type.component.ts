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
  vendortypeList = [];  
  defaultPagination: number;
  totalvendortypeList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;

  constructor(
    private vendortypeService: VendorTypeService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.getVendortypeList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.vendortype.heading;
      this.help_description = res.data.vendortype.desc;
    })

  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getVendortypeList();
  }

  getVendortypeList = function () {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.vendortypeService.getVendorttypeList(params).subscribe(
      (data: any[]) => {
        this.totalvendortypeList = data['count'];
        this.vendortypeList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * Globals.pageSize;
        this.lower_count = this.itemNo + 1;
        if(this.totalvendortypeList > Globals.pageSize*this.defaultPagination){
          this.upper_count = Globals.pageSize*this.defaultPagination
        }
        else{
          this.upper_count = this.totalvendortypeList
        }
        this.spinner.hide();
        // console.log(data)
      }
    );
  };

  activeVendortype = function (id) {
    this.spinner.show();
    let vendortype;

    vendortype = {
      id: id,
      status: true
    };
    this.vendortypeService.activeInactiveVendortype(vendortype).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getVendortypeList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactiveVendortype = function (id) {
    this.spinner.show();
    let vendortype;

    vendortype = {
      id: id,
      status: false
    };

    this.VendortypeService.activeInactiveVendortype(vendortype).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getVendortypeList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  deleteVendortype = function (id) {
    this.spinner.show();
    let vendortype;

    vendortype = {
      id: id
    };

    this.vendortypeService.deleteVendortype(vendortype).subscribe(
      response => {
        this.toastr.success('Vendor type deleted successfully', '', {
          timeOut: 3000,
        });
        this.getVendortypeList();
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
    this.spinner.show();
    this.getVendortypeList();
  };

}
