import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { StocksComponent } from './stocks.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    StocksRoutingModule,
    CoreModule
  ],
  declarations: [StocksComponent]
})
export class StocksModule { }
