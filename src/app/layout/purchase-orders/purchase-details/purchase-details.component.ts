import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PurchaseOrdersService } from '../../../core/services/purchase-orders.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getPurchaseOrderDetails(this.route.snapshot.params['id']);
  }

  getPurchaseOrderDetails(id) {
    this.purchaseOrdersService.getPurchaseOrderDetails(id).subscribe(
      (data: any[]) =>{
        this.purchaseOrder = data;
        this.visible_key = true
        this.spinner.hide();
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
