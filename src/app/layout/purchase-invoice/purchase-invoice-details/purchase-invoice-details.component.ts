import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PurchaseInvoiceService } from '../../../core/services/purchase-invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';

@Component({
  selector: 'app-purchase-invoice-details',
  templateUrl: './purchase-invoice-details.component.html',
  styleUrls: ['./purchase-invoice-details.component.scss']
})
export class PurchaseInvoiceDetailsComponent implements OnInit {

  purchaseInvoice;
  visible_key: boolean;
  help_heading = "";
  help_description = "";
  constructor(
    private purchaseInvoiceService: PurchaseInvoiceService,
    private router: Router, 
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getPurchaseInvoiceDetails(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseInvoiceDetails.heading;
      this.help_description = res.data.purchaseInvoiceDetails.desc;
    })
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
