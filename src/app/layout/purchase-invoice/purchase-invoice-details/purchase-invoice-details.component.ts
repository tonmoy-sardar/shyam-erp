import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PurchaseInvoiceService } from '../../../core/services/purchase-invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purchase-invoice-details',
  templateUrl: './purchase-invoice-details.component.html',
  styleUrls: ['./purchase-invoice-details.component.scss']
})
export class PurchaseInvoiceDetailsComponent implements OnInit {

  purchaseInvoice;
  visible_key: boolean
  constructor(
    private purchaseInvoiceService: PurchaseInvoiceService,
    private router: Router, 
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getPurchaseInvoiceDetails(this.route.snapshot.params['id']);
  }

  getPurchaseInvoiceDetails(id) {
    this.purchaseInvoiceService.getPurchaseInvoiceDetails(id).subscribe(
      (data: any[]) =>{
        this.purchaseInvoice = data;
        // console.log(this.purchaseInvoice)
        this.visible_key = true
        this.spinner.hide();
      }
     );
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };
  

}
