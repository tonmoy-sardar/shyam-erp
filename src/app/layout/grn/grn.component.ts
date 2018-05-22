import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GrnService } from '../../core/services/grn.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grn',
  templateUrl: './grn.component.html',
  styleUrls: ['./grn.component.scss']
})
export class GrnComponent implements OnInit {
  grnList = []
  defaultPagination: number;
  totalgrnList: number;
  search_key = '';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private grnService: GrnService
  ) { }

  ngOnInit() {
    this.defaultPagination = 1;
    this.getGrnList();
  }

  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  dataSearch() {
    this.defaultPagination = 1;
    this.getGrnList();
  }

  getGrnList(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.grnService.getGrnList(params).subscribe(
      (data: any[]) => {
        this.totalgrnList = data['count'];
        this.grnList = data['results'];
        // console.log(this.grnList)
      }
    );
  }

  activeState(id) {
    let grn;

    grn = {
      id: id,
      status: true
    };
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
  };

  inactiveState(id) {
    let grn;

    grn = {
      id: id,
      status: false
    };

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
  };

  approveGrn(id) {
    let grn;

    grn = {
      id: id,
      is_approve: 1
    };
    this.grnService.approveDisapproveGrn(grn).subscribe(
      response => {
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
  };

  disApproveGrn(id) {
    let grn;

    grn = {
      id: id,
      is_approve: 0
    };

    this.grnService.approveDisapproveGrn(grn).subscribe(
      response => {
        this.toastr.success('GRN disapproved successfully', '', {
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
  };

  pagination() {
    this.getGrnList();
  };

}
