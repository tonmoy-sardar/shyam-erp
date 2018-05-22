import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrnComponent } from './grn.component';
import { GrnAddComponent } from './grn-add/grn-add.component';


const routes: Routes = [
  {
  path: '',
  component: GrnComponent
  },
  {
    path: 'add',
    component: GrnAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrnRoutingModule { }
