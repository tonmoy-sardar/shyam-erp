import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnRoutingModule } from './grn-routing.module';
import { GrnComponent } from './grn.component';
import { GrnAddComponent } from './grn-add/grn-add.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    GrnRoutingModule,
    CoreModule
    
  ],
  declarations: [GrnComponent, GrnAddComponent],
  providers: []
})
export class GrnModule { }
