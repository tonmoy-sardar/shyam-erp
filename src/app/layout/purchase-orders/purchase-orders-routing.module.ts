import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrdersComponent } from './purchase-orders.component';
import { PurchaseOrdersAddComponent } from './purchase-orders-add/purchase-orders-add.component';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';
const routes: Routes = [
  {
    path: '',
    component: PurchaseOrdersComponent
  },
  {
    path: 'add',
    component: PurchaseOrdersAddComponent
  },
  {
    path: 'details/:id',
    component: PurchaseDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrdersRoutingModule { }
