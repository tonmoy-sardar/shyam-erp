import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PurchaseRequisitionService } from '../../../core/services/purchase-requisition.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';

@Component({
  selector: 'app-purchase-requisition-deatils',
  templateUrl: './purchase-requisition-deatils.component.html',
  styleUrls: ['./purchase-requisition-deatils.component.scss']
})
export class PurchaseRequisitionDeatilsComponent implements OnInit {
  purchaseRequisition;
  help_heading = "";
  help_description = "";
  constructor(
    private purchaseRequisitionService: PurchaseRequisitionService,
    private router: Router, 
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.purchaseRequisition = {
      company: {company_name:'',id:''},
      requisition_map:[{id:'',requisition_no:''}],
      purchase_org:{id:'',name:''},
      purchase_grp:{id:'',name:''},
      created_at:'',
      status:'',
      created_by:{first_name:'',id:''},
      requisition_detail:[{material:{material_code:'',material_fullname:'',id:''},quantity:'',uom:{id:'',name:''}}]
    };
    this.getPurchaseRequisitionDetails(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseRequisitionDetails.heading;
      this.help_description = res.data.purchaseRequisitionDetails.desc;
    })
  }

  getPurchaseRequisitionDetails(id) {

    this.purchaseRequisitionService.getPurchaseRequisitionDetails(id).subscribe(
      (data: any[]) =>{
        this.purchaseRequisition = data;
        this.spinner.hide();
      }
     );
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

}
