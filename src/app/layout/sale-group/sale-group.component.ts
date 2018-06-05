import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleGroupService } from '../../core/services/sale-group.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-sale-group',
  templateUrl: './sale-group.component.html',
  styleUrls: ['./sale-group.component.scss']
})
export class SaleGroupComponent implements OnInit {
  saleGroupList = [];
  defaultPagination: number;
  totalSaleGroupList: number;
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
    private saleGroupService: SaleGroupService,
    private router: Router,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.headerThOption = [
      {  
        name: "Group Name",
        code: "name",
        sort_type:''
      },
      {  
        name: "Group Description",
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
    this.getSaleGroupList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.saleGroup.heading;
      this.help_description = res.data.saleGroup.desc;
    })
  }

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getSaleGroupList();
  }
  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  getSaleGroupList(){
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
    this.saleGroupService.getSaleGroupList(params).subscribe(
      (data: any[]) =>{
        this.totalSaleGroupList = data['count'];   
        this.saleGroupList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;

        if(this.totalSaleGroupList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalSaleGroupList
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

  activeSaleGroup(id){
    this.loading = LoadingState.Processing;
    let saleGroup;

    saleGroup = {
      id: id,
      status: true
    };
    this.saleGroupService.activeInactiveSaleGroup(saleGroup).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getSaleGroupList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  inactiveSaleGroup(id){
    this.loading = LoadingState.Processing;
    let saleGroup;

    saleGroup = {
      id: id,
      status: false
    };

    this.saleGroupService.activeInactiveSaleGroup(saleGroup).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getSaleGroupList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  pagination() {
    this.loading = LoadingState.Processing;
    this.getSaleGroupList();
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
    this.getSaleGroupList();
  };

}
