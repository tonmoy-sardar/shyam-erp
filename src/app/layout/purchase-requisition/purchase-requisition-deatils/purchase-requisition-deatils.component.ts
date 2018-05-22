import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PurchaseRequisitionService } from '../../../core/services/purchase-requisition.service';

@Component({
  selector: 'app-purchase-requisition-deatils',
  templateUrl: './purchase-requisition-deatils.component.html',
  styleUrls: ['./purchase-requisition-deatils.component.scss']
})
export class PurchaseRequisitionDeatilsComponent implements OnInit {
  purchaseRequisition;
  constructor(
    private purchaseRequisitionService: PurchaseRequisitionService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
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
  }

  getPurchaseRequisitionDetails(id) {

    this.purchaseRequisitionService.getPurchaseRequisitionDetails(id).subscribe(
      (data: any[]) =>{
        this.purchaseRequisition = data;
        console.log(this.purchaseRequisition);
      }
     );
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

}
