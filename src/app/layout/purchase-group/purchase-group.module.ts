import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseGroupRoutingModule } from './purchase-group-routing.module';
import { PurchaseGroupComponent } from './purchase-group.component';
import { PurchaseGroupAddComponent } from './purchase-group-add/purchase-group-add.component';
import { PurchaseGroupEditComponent } from './purchase-group-edit/purchase-group-edit.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    PurchaseGroupRoutingModule,
    CoreModule
  ],
  declarations: [PurchaseGroupComponent, PurchaseGroupAddComponent, PurchaseGroupEditComponent],
  providers: []
})
export class PurchaseGroupModule { }
