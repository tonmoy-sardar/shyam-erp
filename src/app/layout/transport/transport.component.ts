import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransportService } from '../../core/services/transport.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {
  transportList = [];
  defaultPagination: number;
  totalTransportList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private transportService: TransportService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.getTransportList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.transport.heading;
      this.help_description = res.data.transport.desc;
    })
  }

  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getTransportList();
  }
  
  getTransportList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.transportService.getTransporterList(params).subscribe(
      (data: any[]) => {
       
        this.totalTransportList = data['count'];
        this.transportList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * Globals.pageSize;
        this.lower_count = this.itemNo + 1;
        if(this.totalTransportList > Globals.pageSize*this.defaultPagination){
          this.upper_count = Globals.pageSize*this.defaultPagination
        }
        else{
          this.upper_count = this.totalTransportList
        }
        this.spinner.hide();
      }
    );
  };
  
  activeState(id) {
    this.spinner.show();
    let transporter;

    transporter = {
      id: id,
      status: true
    };
    this.transportService.activeInactiveTransporter(transporter).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getTransportList();
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
    let transporter;

    transporter = {
      id: id,
      status: false
    };

    this.transportService.activeInactiveTransporter(transporter).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getTransportList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  deletetransport(id) {
    this.spinner.show();
    let transporter;

    transporter = {
      id: id
    };

    this.transportService.deleteTransporter(transporter).subscribe(
      response => {
        this.toastr.success('Transporter deleted successfully', '', {
          timeOut: 3000,
        });
        this.getTransportList();
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
    this.getTransportList();
  };
}
