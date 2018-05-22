import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseGroupComponent } from './purchase-group.component';
import { PurchaseGroupAddComponent } from './purchase-group-add/purchase-group-add.component';
import { PurchaseGroupEditComponent } from './purchase-group-edit/purchase-group-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseGroupComponent
  },
  {
    path: 'add',
    component: PurchaseGroupAddComponent
  },
  {
    path: 'edit/:id',
    component: PurchaseGroupEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseGroupRoutingModule { }
