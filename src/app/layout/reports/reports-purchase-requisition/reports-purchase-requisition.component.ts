import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';
import { PurchaseRequisitionService } from '../../../core/services/purchase-requisition.service';
import { CompanyService } from '../../../core/services/company.service';
import { ReportsService } from '../../../core/services/reports.service';
import * as Globals from '../../../core/globals';

@Component({
  selector: 'app-reports-purchase-requisition',
  templateUrl: './reports-purchase-requisition.component.html',
  styleUrls: ['./reports-purchase-requisition.component.scss']
})
export class ReportsPurchaseRequisitionComponent implements OnInit {
  form: FormGroup;
  help_heading = "";
  help_description = "";
  requisition_list: any[] = [];
  company_list: any[] = [];
  vendor_list: any[] = [];
  defaultPagination: number;
  SearchRequisitionList: any[] = [];
  totalSearchRequisitionList: number;
  Search_requisition_list_key: boolean;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  requisitionDetails: any;
  requisition_details_key: boolean;
  company: number;
  status = '';
  approve = '';
  requisition_date: any;
  from_date: any;
  to_date: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService,
    private purchaseRequisitionService: PurchaseRequisitionService,
    private companyService: CompanyService,
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.getRequisitionList();
    this.getCompanyList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.employeeAdd.heading;
      this.help_description = res.data.employeeAdd.desc;
    })
  }

  getRequisitionList() {
    this.purchaseRequisitionService.getPurchaseRequisitionListWithoutPagination().subscribe(
      res => {
        this.requisition_list = res;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      }
    )
  }

  requisitionChange(id) {
    if (id) {
      this.spinner.show();
      this.purchaseRequisitionService.getPurchaseRequisitionDetails(id).subscribe(res => {
        this.requisitionDetails = res;
        // console.log(this.requisitionDetails)
        this.requisition_details_key = true;
        this.Search_requisition_list_key = false;
        this.spinner.hide();
      })
    }
    else {
      this.requisition_details_key = false;
      this.getSearchRequisitionList();
    }
  }

  getCompanyList() {
    this.companyService.getCompanyDropdownList().subscribe(res => {
      this.company_list = res;
    })
  }  

  search() {
    this.getSearchRequisitionList();
  }

  pagination() {
    this.getSearchRequisitionList();
  }

  dConvert(n) {
    return n < 10 ? "0"+n : n;
  }

  getSearchRequisitionList() {
    this.Search_requisition_list_key = true;    
    this.spinner.show();
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if (this.company > 0) {
      params.set('company', this.company.toString());
    }
    if (this.status != "") {
      params.set('status', this.status.toString());
    }
    if (this.approve != "") {
      params.set('approve', this.approve.toString());
    }    

    if (this.from_date != undefined && this.to_date != undefined) {
      var FrDate = new Date(this.from_date.year, this.from_date.month - 1, this.from_date.day)
      params.set('from_date', FrDate.getFullYear()+"-"+this.dConvert(FrDate.getMonth()+1)+"-"+this.dConvert(FrDate.getDate()));
      var ToDate = new Date(this.to_date.year, this.to_date.month - 1, this.to_date.day)
      params.set('to_date', ToDate.getFullYear()+"-"+this.dConvert(ToDate.getMonth()+1)+"-"+this.dConvert(ToDate.getDate()));
      this.requisition_date = ""
    }

    else if (this.requisition_date != undefined) {
      var RqDate = new Date(this.requisition_date.year, this.requisition_date.month - 1, this.requisition_date.day)
      params.set('created_at', RqDate.getFullYear()+"-"+this.dConvert(RqDate.getMonth()+1)+"-"+this.dConvert(RqDate.getDate()));
    }

    this.reportsService.getRequisitionReportList(params).subscribe(
      (data: any[]) => {
        this.totalSearchRequisitionList = data['count'];
        this.SearchRequisitionList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * Globals.pageSize;
        this.lower_count = this.itemNo + 1;
        if (this.totalSearchRequisitionList > Globals.pageSize * this.defaultPagination) {
          this.upper_count = Globals.pageSize * this.defaultPagination
        }
        else {
          this.upper_count = this.totalSearchRequisitionList
        }        
        this.spinner.hide();
        // console.log(data)
      },
      error => {
        this.spinner.hide();
      }
    );
  };
}
