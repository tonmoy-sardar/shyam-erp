import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleOrganizationService } from '../../core/services/sale-organization.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-sale-organization',
  templateUrl: './sale-organization.component.html',
  styleUrls: ['./sale-organization.component.scss']
})
export class SaleOrganizationComponent implements OnInit {
  saleOrganizationList = [];
  defaultPagination: number;
  totalSaleOrganizationList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;

  sort_by = '';
  sort_type= '';
  loading: LoadingState = LoadingState.NotReady;
  headerThOption = [];
  constructor(
    private saleOrganizationService: SaleOrganizationService,
    private router: Router,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.headerThOption = [
      {  
        name: "Organization Name",
        code: "name",
        sort_type:''
      },
      {  
        name: "Organization Description",
        code: "description",
        sort_type:''
      },
      {  
        name: "Status",
        code: "status",
        sort_type:''
      }
    ];
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getSaleOrganizationList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.saleOrganization.heading;
      this.help_description = res.data.saleOrganization.desc;
    })
  }

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getSaleOrganizationList();
  }
  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getSaleOrganizationList = function () {
    let params: URLSearchParams = new URLSearchParams();
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
    this.saleOrganizationService.getSaleOrganizationList(params).subscribe(
      (data: any[]) => {
        this.totalSaleOrganizationList = data['count'];
        this.saleOrganizationList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;

        if(this.totalSaleOrganizationList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalSaleOrganizationList
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
  };

  activeSaleOrganization = function (id) {
    this.loading = LoadingState.Processing;
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
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  inactiveSaleOrganization = function (id) {
    this.loading = LoadingState.Processing;
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
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  pagination = function () {
    this.loading = LoadingState.Processing;
    this.getSaleOrganizationList();
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
    this.getSaleOrganizationList();
  };
}
