import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransportService } from '../../core/services/transport.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {
  transportList = [];
  defaultPagination: number;
  totaltransportList: number;
  search_key = '';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private transportService: TransportService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.gettransportList();
  }

  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.gettransportList();
  }
  
  gettransportList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.transportService.getTransporterList(params).subscribe(
      (data: any[]) => {
        this.totaltransportList = data['count'];
        this.transportList = data['results'];
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
        this.gettransportList();
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
        this.gettransportList();
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
        this.gettransportList();
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
    this.gettransportList();
  };
}
