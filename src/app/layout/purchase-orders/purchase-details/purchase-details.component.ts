import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PurchaseOrdersService } from '../../../core/services/purchase-orders.service';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})
export class PurchaseDetailsComponent implements OnInit {
  purchaseOrder;
  visible_key: boolean
  constructor(
    private purchaseOrdersService: PurchaseOrdersService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPurchaseOrderDetails(this.route.snapshot.params['id']);
  }

  getPurchaseOrderDetails(id) {
    this.purchaseOrdersService.getPurchaseOrderDetails(id).subscribe(
      (data: any[]) =>{
        this.purchaseOrder = data;
        this.visible_key = true
        // console.log(this.purchaseOrder);
      }
     );
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  getRequisitionDate(date){
    var PrDate = date.split('/')
    return PrDate[0]
  }
}
