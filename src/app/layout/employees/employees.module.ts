import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeesAddComponent } from './employees-add/employees-add.component';
import { EmployeesEditComponent } from './employees-edit/employees-edit.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    CoreModule
  ],
  declarations: [EmployeesComponent, EmployeesAddComponent, EmployeesEditComponent]
})
export class EmployeesModule { }
