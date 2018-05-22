import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CompanyService } from '../../../core/services/company.service';
import { StatesService} from '../../../core/services/states.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company;
  states;
  constructor(private companyService: CompanyService, private statesService: StatesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.company = {
      id: '',
      company_name: '',
      company_url: '',
      company_email: '',
      company_contact: '',
      company_address:'',
      company_state:'',
      company_city:'',
      company_pin:'',
      company_gst:'',
      company_pan:'',
      company_cin:''
    };

    this.states = {
      id: '',
      state_name: '',
      tin_number: '',
      state_code:''
    };
    this.getCompanyDetails(this.route.snapshot.params['id']);

  }

  getCompanyDetails(id) {

    this.companyService.getCompanyDetails(id).subscribe(
      (data: any[]) =>{
        this.company = data;
       
        if(this.company.company_state)
        {
          this.getStateDetails(this.company.company_state);
        }
      }
     );
  }

  getStateDetails(id) {
    this.statesService.getStateDetails(id).subscribe(
      (data: any[]) =>{  
        this.states = data;
      }
     );
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

}
