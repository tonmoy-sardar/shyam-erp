import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchAddComponent } from './branch-add/branch-add.component';
import { BranchEditComponent } from './branch-edit/branch-edit.component';
import { StorageLocationListComponent } from './storage-location-list/storage-location-list.component';
import { StorageLocationAddComponent } from './storage-location-add/storage-location-add.component';
import { StorageLocationEditComponent } from './storage-location-edit/storage-location-edit.component';
import { StorageBinListComponent } from './storage-bin-list/storage-bin-list.component';
import { StorageBinAddComponent } from './storage-bin-add/storage-bin-add.component';
import { StorageBinEditComponent } from './storage-bin-edit/storage-bin-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent
  },
  {
    path: 'add',
    component: CompanyAddComponent
  },
  {
    path: 'details/:id',
    component: CompanyDetailsComponent
  },
  {
    path: 'edit/:id',
    component: CompanyEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
