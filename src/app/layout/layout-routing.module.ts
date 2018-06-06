import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,   
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'states', loadChildren: './states/states.module#StatesModule' },
      { path: 'gst-rates', loadChildren: './gst-rates/gst-rates.module#GstRatesModule' },
      { path: 'vendor', loadChildren: './vendor/vendor.module#VendorModule' },
      {
        path: 'terms-condition',
        canLoad: [NgxPermissionsGuard],        
        data: {
          permissions: {
            only: ['Admin', 'Staff'],
            redirectTo: '/dashboard'
          }
        },
        loadChildren: './terms-condition/terms-condition.module#TermsConditionModule'
      },
      { path: 'banks', loadChildren: './banks/banks.module#BanksModule' },
      { path: 'material-group', loadChildren: './material-group/material-group.module#MaterialGroupModule' },
      { path: 'material', loadChildren: './material/material.module#MaterialModule' },
      { path: 'transport', loadChildren: './transport/transport.module#TransportModule' },
      { path: 'purchase-organization', loadChildren: './purchase-organization/purchase-organization.module#PurchaseOrganizationModule' },
      { path: 'purchase-group', loadChildren: './purchase-group/purchase-group.module#PurchaseGroupModule' },
      { path: 'sale-organization', loadChildren: './sale-organization/sale-organization.module#SaleOrganizationModule' },
      { path: 'sale-group', loadChildren: './sale-group/sale-group.module#SaleGroupModule' },
      { path: 'company', loadChildren: './company/company.module#CompanyModule' },
      { path: 'purchase-requisition', loadChildren: './purchase-requisition/purchase-requisition.module#PurchaseRequisitionModule' },
      { path: 'purchase-orders', loadChildren: './purchase-orders/purchase-orders.module#PurchaseOrdersModule' },
      { path: 'grn', loadChildren: './grn/grn.module#GrnModule' },
      { path: 'purchase-invoice', loadChildren: './purchase-invoice/purchase-invoice.module#PurchaseInvoiceModule' },
      { path: 'stocks', loadChildren: './stocks/stocks.module#StocksModule' },
      { path: 'stocks-transfer', loadChildren: './stocks-transfer/stocks-transfer.module#StocksTransferModule' },
      { path: 'departments', loadChildren: './departments/departments.module#DepartmentsModule' },
      { path: 'designations', loadChildren: './designations/designations.module#DesignationsModule' },
      { path: 'employees', loadChildren: './employees/employees.module#EmployeesModule' },
      { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
      { path: 'vendor-type', loadChildren: './vendor-type/vendor-type.module#VendorTypeModule' },
      { path: 'expenses', loadChildren: './expenses/expenses.module#ExpensesModule' },
      { path: 'contractors', loadChildren: './contractors/contractors.module#ContractorsModule' },
      { path: 'accounting', loadChildren: './accounting/accounting.module#AccountingModule' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
