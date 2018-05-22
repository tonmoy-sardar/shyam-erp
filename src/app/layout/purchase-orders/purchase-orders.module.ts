import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrdersRoutingModule } from './purchase-orders-routing.module';
import { PurchaseOrdersComponent } from './purchase-orders.component';
import { PurchaseOrdersAddComponent } from './purchase-orders-add/purchase-orders-add.component';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    PurchaseOrdersRoutingModule,
    CoreModule
  ],
  declarations: [PurchaseOrdersComponent, PurchaseOrdersAddComponent, PurchaseDetailsComponent],
  providers: []
})
export class PurchaseOrdersModule { }
