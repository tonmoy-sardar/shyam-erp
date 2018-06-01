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
  totalStateList: number;
  search_key = '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
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
    this.itemPerPage = Globals.itemPerPage;
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

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getStateList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.statesService.getStateList(params).subscribe(
      (data: any[]) => {
        this.totalStateList = data['count'];
        this.stateList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if(this.totalStateList > this.itemPerPage*this.defaultPagination){
          this.upper_count = this.itemPerPage*this.defaultPagination
        }
        else{
          this.upper_count = this.totalStateList
        }
        this.spinner.hide();
        // console.log(data)
      }
    );
  };

  activeState(id) {
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

  inactiveState(id) {
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

  deleteState(id) {
    this.spinner.show();
    let state;

    state = {
      id: id,
      is_deleted: true
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

  pagination() {
    this.spinner.show();
    this.getStateList();
  };


}
