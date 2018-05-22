import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrganizationRoutingModule } from './purchase-organization-routing.module';
import { PurchaseOrganizationComponent } from './purchase-organization.component';
import { PurchaseOrganizationAddComponent } from './purchase-organization-add/purchase-organization-add.component';
import { PurchaseOrganizationEditComponent } from './purchase-organization-edit/purchase-organization-edit.component';
import { PurchaseOrganizationMappingComponent } from './purchase-organization-mapping/purchase-organization-mapping.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    PurchaseOrganizationRoutingModule,
    CoreModule

  ],
  declarations: [PurchaseOrganizationComponent, PurchaseOrganizationAddComponent, PurchaseOrganizationEditComponent, PurchaseOrganizationMappingComponent],
  providers: []
})
export class PurchaseOrganizationModule { }
