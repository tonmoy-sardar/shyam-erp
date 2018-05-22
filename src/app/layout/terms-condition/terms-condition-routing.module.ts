import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsConditionComponent } from './terms-condition.component';
import { TermsConditionAddComponent } from './terms-condition-add/terms-condition-add.component';
import { TermsConditionEditComponent } from './terms-condition-edit/terms-condition-edit.component';

const routes: Routes = [
  {
  path: '',
  component: TermsConditionComponent
  },
  {
    path: 'add',
    component: TermsConditionAddComponent
  },
  {
    path: 'edit/:id',
    component: TermsConditionEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsConditionRoutingModule { }
