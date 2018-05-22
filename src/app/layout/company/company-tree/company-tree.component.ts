import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CompanyService } from '../../../core/services/company.service';
@Component({
  selector: 'app-company-tree',
  templateUrl: './company-tree.component.html',
  styleUrls: ['./company-tree.component.scss']
})
export class CompanyTreeComponent implements OnInit {
  companyList;
  
  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
    this.getCompanyList();
  }

  getCompanyList= function(){
    this.companyService.getCompanyList().subscribe(
      (data: any[]) =>{   
        this.companyList = data;
        // console.log(this.companyList);
      }
     );
  };

  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

}
