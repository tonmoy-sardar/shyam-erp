import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleGroupRoutingModule } from './sale-group-routing.module';
import { SaleGroupComponent } from './sale-group.component';
import { SaleGroupAddComponent } from './sale-group-add/sale-group-add.component';
import { SaleGroupEditComponent } from './sale-group-edit/sale-group-edit.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    SaleGroupRoutingModule,
    CoreModule
  ],
  declarations: [SaleGroupComponent, SaleGroupAddComponent, SaleGroupEditComponent],
  providers: []
})
export class SaleGroupModule { }
