import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';


@Component({
  selector: 'app-company-tree',
  templateUrl: './company-tree.component.html',
  styleUrls: ['./company-tree.component.scss']
})
export class CompanyTreeComponent implements OnInit {
  companyList;
  help_heading = "";
  help_description = "";

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getCompanyList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.company.heading;
      this.help_description = res.data.company.desc;
    })
  }
  getCompanyList() {
    this.companyService.getCompanyList().subscribe(
      (data: any[]) => {
        this.companyList = data;
        this.spinner.hide();
      }
    );
  };

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

}
