import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleOrganizationComponent } from './sale-organization.component';
import { SaleOrganizationAddComponent } from './sale-organization-add/sale-organization-add.component';
import { SaleOrganizationEditComponent } from './sale-organization-edit/sale-organization-edit.component';

const routes: Routes = [
  {
  path: '',
  component: SaleOrganizationComponent
  },
  {
    path: 'add',
    component: SaleOrganizationAddComponent
  },
  {
    path: 'edit/:id',
    component: SaleOrganizationEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleOrganizationRoutingModule { }
