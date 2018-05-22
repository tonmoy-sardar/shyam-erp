import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleGroupComponent } from './sale-group.component';
import { SaleGroupAddComponent } from './sale-group-add/sale-group-add.component';
import { SaleGroupEditComponent } from './sale-group-edit/sale-group-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SaleGroupComponent
  },
  {
    path: 'add',
    component: SaleGroupAddComponent
  },
  {
    path: 'edit/:id',
    component: SaleGroupEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleGroupRoutingModule { }
