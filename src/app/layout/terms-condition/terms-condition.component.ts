import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TermsConditionService } from '../../core/services/terms-condition.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../core/services/company.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../../core/component/confirm-dialog/confirm-dialog.component';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {
  termsList = [];
  defaultPagination: number;
  totalTermsList: number;
  search_key = '';
  companyList = [];
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private termsConditionService: TermsConditionService,
    private companyService: CompanyService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService,
    public dialog: MatDialog,
    private permissionsService: NgxPermissionsService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getTermsList();
    this.getCompanyDropdownList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.terms.heading;
      this.help_description = res.data.terms.desc;
    })
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getTermsList();
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getCompanyDropdownList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;
        // console.log(this.companyList);
      }
    );
  };
  getTermsList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    params.set('search', this.search_key.toString());
    this.termsConditionService.getTermsList(params).subscribe(
      (data: any[]) => {
        this.totalTermsList = data['count'];
        this.termsList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalTermsList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalTermsList
        }
        this.spinner.hide();
      }
    );
  };
  getCompanyName(id) {
    var data = { id: 0, company_name: '' }
    data = this.companyList.filter(x => x.id === id)[0];
    if (data != undefined) {
      return data.company_name
    }
  }
  activeState(id) {
    this.spinner.show();
    let terms;

    terms = {
      id: id,
      status: true
    };
    this.termsConditionService.activeInactiveTerms(terms).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getTermsList();
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
    let terms;

    terms = {
      id: id,
      status: false
    };

    this.termsConditionService.activeInactiveTerms(terms).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getTermsList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  deleteTerm(id) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        let terms;

        terms = {
          id: id
        };

        this.termsConditionService.deleteTerms(terms).subscribe(
          response => {
            this.toastr.success('Terms deleted successfully', '', {
              timeOut: 3000,
            });
            this.getTermsList();
          },
          error => {
            console.log('error', error)
            // this.toastr.error('everything is broken', '', {
            //   timeOut: 3000,
            // });
          }
        );
      }
      this.dialogRef = null;
    });
  };

  pagination() {
    this.spinner.show();
    this.getTermsList();
  };


  // openConfirmationDialog() {
  //   this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     disableClose: false
  //   });
  //   this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

  //   this.dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       console.log("delete")
  //     }
  //     this.dialogRef = null;
  //   });
  // }
}
