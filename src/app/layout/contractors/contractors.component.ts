import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractorsService } from '../../core/services/contractors.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.scss']
})
export class ContractorsComponent implements OnInit {
  contractorList = []
  defaultPagination: number;
  totalContractorList: number;
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
    private contractorService: ContractorsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    //this.spinner.show();
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getContractorList();
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
    this.getContractorList();
  }
  
  getContractorList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.contractorService.getContractorList(params).subscribe(
      (data: any[]) => {
        this.totalContractorList = data['count'];
        this.contractorList = data['results'];
        console.log(this.contractorList);
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if(this.totalContractorList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalContractorList
        }
        this.spinner.hide();
      }
    );
  };

  activeState(id) {
    this.spinner.show();
    let contractor;

    contractor = {
      id: id,
      status: true
    };
    // this.contractorService.activeInactiveContractor(contractor).subscribe(
    //   response => {
    //     this.toastr.success('Status changed successfully', '', {
    //       timeOut: 3000,
    //     });
    //     this.getContractorList();
    //   },
    //   error => {
    //     console.log('error', error)
    //     // this.toastr.error('everything is broken', '', {
    //     //   timeOut: 3000,
    //     // });
    //   }
    // );
  };
}
