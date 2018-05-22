import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatesService } from '../../core/services/states.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {
  stateList = [];
  defaultPagination: number;
  totalstateList: number;
  search_key = '';

  
  constructor(
    private statesService: StatesService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getStateList();
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getStateList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getStateList = function () {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.statesService.getStateList(params).subscribe(
      (data: any[]) => {
        this.totalstateList = data['count'];
        this.stateList = data['results'];
        this.spinner.hide();
      }
    );
  };

  activeState = function (id) {
    this.spinner.show();
    let state;

    state = {
      id: id,
      status: true
    };
    this.statesService.activeInactiveState(state).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getStateList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  inactiveState = function (id) {
    this.spinner.show();
    let state;

    state = {
      id: id,
      status: false
    };

    this.statesService.activeInactiveState(state).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getStateList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  deleteState = function (id) {
    this.spinner.show();
    let state;

    state = {
      id: id
    };

    this.statesService.deleteState(state).subscribe(
      response => {
        this.toastr.success('State deleted successfully', '', {
          timeOut: 3000,
        });
        this.getStateList();
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
    this.getStateList();
  };


}
