import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleOrganizationRoutingModule } from './sale-organization-routing.module';
import { SaleOrganizationComponent } from './sale-organization.component';
import { SaleOrganizationAddComponent } from './sale-organization-add/sale-organization-add.component';
import { SaleOrganizationEditComponent } from './sale-organization-edit/sale-organization-edit.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    SaleOrganizationRoutingModule,
    CoreModule
  ],
  declarations: [SaleOrganizationComponent, SaleOrganizationAddComponent, SaleOrganizationEditComponent],
  providers: []
})
export class SaleOrganizationModule { }
