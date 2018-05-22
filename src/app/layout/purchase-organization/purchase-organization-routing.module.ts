import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrganizationComponent } from './purchase-organization.component';
import { PurchaseOrganizationAddComponent } from './purchase-organization-add/purchase-organization-add.component';
import { PurchaseOrganizationEditComponent } from './purchase-organization-edit/purchase-organization-edit.component';
import { PurchaseOrganizationMappingComponent } from './purchase-organization-mapping/purchase-organization-mapping.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseOrganizationComponent
  },
  {
    path: 'add',
    component: PurchaseOrganizationAddComponent
  },
  {
    path: 'edit/:id',
    component: PurchaseOrganizationEditComponent
  },
  {
    path: 'mapping/:id',
    component: PurchaseOrganizationMappingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrganizationRoutingModule { }
