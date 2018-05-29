import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatesService } from '../../core/services/states.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

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
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  constructor(
    private statesService: StatesService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }


  ngOnInit() {
    this.spinner.show();
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.getStateList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.state.heading;
      this.help_description = res.data.state.desc;
    })
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
        this.itemNo = (this.defaultPagination - 1) * Globals.pageSize;
        this.lower_count = this.itemNo + 1;
        if(this.totalstateList > Globals.pageSize*this.defaultPagination){
          this.upper_count = Globals.pageSize*this.defaultPagination
        }
        else{
          this.upper_count = this.totalstateList
        }
        this.spinner.hide();
        // console.log(data)
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
