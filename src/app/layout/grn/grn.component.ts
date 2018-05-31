import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GrnService } from '../../core/services/grn.service';
import { StocksService } from '../../core/services/stocks.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-grn',
  templateUrl: './grn.component.html',
  styleUrls: ['./grn.component.scss']
})
export class GrnComponent implements OnInit {
  grnList = []
  defaultPagination: number;
  totalGrnList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  stock = {
    grn: '',
    company: '',
    branch: '',
    storage_location: '',
    storage_bin: '',
    material: '',
    rate: '',
    quantity: ''
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private grnService: GrnService,
    private spinner: NgxSpinnerService,
    private stocksService: StocksService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getGrnList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.grn.heading;
      this.help_description = res.data.grn.desc;
    })
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getGrnList();
  }

  getGrnList(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.grnService.getGrnList(params).subscribe(
      (data: any[]) => {
        this.totalGrnList = data['count'];
        this.grnList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if(this.totalGrnList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalGrnList
        }
        this.spinner.hide();
      }
    );
  }

  changeStatus(value, id) {
    this.spinner.show();
    let grn;
    if (value != "") {
      if (value == 0) {
        grn = {
          id: id,
          status: false
        };
      }
      else if (value == 1) {
        grn = {
          id: id,
          status: true
        };
      }
      this.grnService.activeInactiveGrn(grn).subscribe(
        response => {
          this.toastr.success('Status changed successfully', '', {
            timeOut: 3000,
          });
          this.getGrnList();
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
      let grn;
      grn = {
        id: id,
        is_approve: value
      };

      this.grnService.approveDisapproveGrn(grn).subscribe(
        response => {
          if(value == 1){
            this.addNewStock(id)
          }
          else{
            this.toastr.success('GRN dis-approved successfully', '', {
              timeOut: 3000,
            });
            this.getGrnList();
          }          
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

  addNewStock(id){
    this.grnService.getGrnDetails(id).subscribe(res => {
      this.stock = {
        grn: res.id,
        company: res.company.id,
        branch: res.grn_detail[0].company_branch.id,
        storage_location: res.grn_detail[0].storage_location.id,
        storage_bin: res.grn_detail[0].storage_bin.id,
        material: res.grn_detail[0].material.id,
        rate: res.po_order.purchase_order_detail[0].rate,
        quantity: res.grn_detail[0].receive_quantity
      }
      this.stocksService.addNewStock(this.stock).subscribe(
        response => {
          this.spinner.hide();
          this.toastr.success('GRN approved successfully', '', {
            timeOut: 3000,
          });
          this.getGrnList();
        },
        error => {
          console.log('error', error)
          // this.toastr.error('everything is broken', '', {
          //   timeOut: 3000,
          // });
        }
      );
    })
  }

  pagination() {
    this.spinner.show();
    this.getGrnList();
  };

}
