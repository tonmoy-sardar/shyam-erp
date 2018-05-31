import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './component/header/header.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard } from './guard/auth.guard';
import { OnlyNumberDirective } from './directive/only-number.directive';
import { AlertComponent } from './component/alert/alert.component';
import { ButtonsComponent } from './component/buttons/buttons.component';
import { CollapseComponent } from './component/collapse/collapse.component';
import { DatePickerComponent } from './component/date-picker/date-picker.component';
import { DropdownComponent } from './component/dropdown/dropdown.component';
import { ModalComponent } from './component/modal/modal.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { PopOverComponent } from './component/pop-over/pop-over.component';
import { ProgressbarComponent } from './component/progressbar/progressbar.component';
import { RatingComponent } from './component/rating/rating.component';
import { TabsComponent } from './component/tabs/tabs.component';
import { TimepickerComponent } from './component/timepicker/timepicker.component';
import { TooltipComponent } from './component/tooltip/tooltip.component';
import { HelpComponent } from './component/help/help.component';

//----------------Services----------------//
import { LoginService } from './services/login.service';
import { BanksService } from './services/banks.service';
import { CompanyService } from './services/company.service';
import { GrnService } from './services/grn.service';
import { GrnReverseService } from './services/grn-reverse.service';
import { GstRatesService } from './services/gst-rates.service';
import { MaterialService } from './services/material.service';
import { PaymentService } from './services/payment.service';
import { PurchaseGroupService } from './services/purchase-group.service';
import { PurchaseInvoiceService } from './services/purchase-invoice.service';
import { PurchaseRequisitionService } from './services/purchase-requisition.service';
import { PurchaseOrdersService } from './services/purchase-orders.service';
import { PurchaseOrganizationService } from './services/purchase-organization.service';
import { SaleGroupService } from './services/sale-group.service';
import { SaleOrganizationService } from './services/sale-organization.service';
import { StatesService } from './services/states.service';
import { TermsConditionService } from './services/terms-condition.service';
import { VendorService } from './services/vendor.service';
import { TransportService } from './services/transport.service';
import { StocksService } from './services/stocks.service';
import { HelpService } from './services/help.service';
import { DepartmentsService } from './services/departments.service';
import { DesignationsService } from './services/designations.service';
import { EmployeesService } from './services/employees.service';
import { ReportsService } from './services/reports.service';
import { VendorTypeService }  from './services/vendor-type.service';
import { ExpensesService } from './services/expenses.service';
import { ContractorsService } from './services/contractors.service';
import { WindowRefService } from './services/window-ref.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgbDropdownModule.forRoot(),
    RouterModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [
    HeaderComponent,
    OnlyNumberDirective,
    AlertComponent,
    ButtonsComponent,
    CollapseComponent,
    DatePickerComponent,
    DropdownComponent,
    ModalComponent,
    PaginationComponent,
    PopOverComponent,
    ProgressbarComponent,
    RatingComponent,
    TabsComponent,
    TimepickerComponent,
    TooltipComponent,
    HelpComponent
  ],
  providers: [],
  exports: [
    HeaderComponent,
    NgxSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    OnlyNumberDirective,
    AlertComponent,
    ButtonsComponent,
    CollapseComponent,
    DatePickerComponent,
    DropdownComponent,
    ModalComponent,
    PaginationComponent,
    PopOverComponent,
    ProgressbarComponent,
    RatingComponent,
    TabsComponent,
    TimepickerComponent,
    TooltipComponent,
    HelpComponent
  ],
  entryComponents: [

  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthGuard,
        LoginService,
        BanksService,
        CompanyService,
        GrnService,
        GrnReverseService,
        GstRatesService,
        MaterialService,
        PaymentService,
        PurchaseGroupService,
        PurchaseInvoiceService,
        PurchaseRequisitionService,
        PurchaseOrdersService,
        PurchaseOrganizationService,
        SaleGroupService,
        SaleOrganizationService,
        StatesService,
        TermsConditionService,
        VendorService,
        TransportService,
        StocksService,
        HelpService,
        DepartmentsService,
        DesignationsService,
        EmployeesService,
        ReportsService,
        VendorTypeService,
        ExpensesService,
        ContractorsService,
        WindowRefService
      ]
    };
  }
}