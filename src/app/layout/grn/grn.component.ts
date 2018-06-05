import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GrnService } from '../../core/services/grn.service';
import { StocksService } from '../../core/services/stocks.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { LoadingState } from '../../core/component/loading/loading.component';

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

  sort_by = '';
  sort_type= '';
  headerThOption = [];
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private grnService: GrnService,
    private stocksService: StocksService,
    private helpService: HelpService
  ) { }

  ngOnInit() {

    this.headerThOption = [
      {  
        name: "GRN. No.",
        code: "grn_map__grn_no",
        sort_type:'',
        has_tooltip:false,
        tooltip_msg:''
      },
      {  
        name: "PO. No.",
        code: "po_order__purchase_order_map__purchase_order_no",
        sort_type:'',
        has_tooltip:true,
        tooltip_msg:'Purchase Order Number'
      },
      {  
        name: "Company",
        code: "company__company_name",
        sort_type:'',
        has_tooltip:false,
        tooltip_msg:''
      },
      {  
        name: "P. Org.",
        code: "pur_org__name",
        sort_type:'',
        has_tooltip:true,
        tooltip_msg:'Purchase Organisation'
      },
      {  
        name: "P. Group",
        code: "pur_grp__name",
        sort_type:'',
        has_tooltip:true,
        tooltip_msg:'Purchase Group'
      },
      {  
        name: "Vendor",
        code: "vendor__vendor_fullname",
        sort_type:'',
        has_tooltip:false,
        tooltip_msg:''
      },
      {  
        name: "Vendor Address",
        code: "vendor_address__address",
        sort_type:'',
        has_tooltip:false,
        tooltip_msg:''
      },
      {  
        name: "GRN Raised Date",
        code: "created_at",
        sort_type:'',
        has_tooltip:false,
        tooltip_msg:''
      },
    ];

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
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getGrnList();
  }

  getGrnList(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if(this.search_key !='')
    {
      params.set('search', this.search_key.toString());
    }
    if(this.sort_by !='')
    {
      params.set('field_name', this.sort_by.toString());
    }

    if(this.sort_type !='')
    {
      params.set('order_by', this.sort_type.toString());
    }
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
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

  changeStatus(value, id) {
    this.loading = LoadingState.Processing;
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
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    }
  }

  changeApproveStatus(value, id) {    
    if (value > 0) {

      this.loading = LoadingState.Processing;
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
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
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
          this.loading = LoadingState.Ready;
          this.toastr.success('GRN approved successfully', '', {
            timeOut: 3000,
          });
          this.getGrnList();
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    })
  }

  pagination() {
    this.loading = LoadingState.Processing;
    this.getGrnList();
  };

  sortTable(value)
  {
    let type = '';
    this.headerThOption.forEach(function (optionValue) {
      if(optionValue.code == value)
      {
        if(optionValue.sort_type =='desc')
        {
          type = 'asc';
        }
        else
        {
          type = 'desc';
        }
        optionValue.sort_type = type;
      }
      else{
        optionValue.sort_type = '';
      }
    });

    this.sort_by = value;
    this.sort_type = type;
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getGrnList();
  };

}
