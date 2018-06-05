import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrdersService } from '../../../core/services/purchase-orders.service';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-purchase-orders-details',
  templateUrl: './purchase-orders-details.component.html',
  styleUrls: ['./purchase-orders-details.component.scss']
})
export class PurchaseOrdersDetailsComponent implements OnInit {

  purchaseOrder;
  visible_key: boolean;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private purchaseOrdersService: PurchaseOrdersService,
    private router: Router,
    private route: ActivatedRoute,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.getPurchaseOrderDetails(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseOrderDetails.heading;
      this.help_description = res.data.purchaseOrderDetails.desc;
    })
  }

  getPurchaseOrderDetails(id) {
    this.purchaseOrdersService.getPurchaseOrderDetails(id).subscribe(
      (data: any[]) => {
        this.purchaseOrder = data;
        this.visible_key = true
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
      }
    );
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getRequisitionDate(date) {
    var PrDate = date.split('/')
    return PrDate[0]
  }

}
