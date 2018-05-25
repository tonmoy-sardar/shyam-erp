import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { PaymentService } from '../../../core/services/payment.service';
import { PurchaseInvoiceService } from '../../../core/services/purchase-invoice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.scss']
})
export class PaymentAddComponent implements OnInit {
  payment;
  companyList = [];
  bankList = [];
  invoiceList = [];
  purchaseInvoiceId: number;
  form: FormGroup;
  constructor(
    private companyService: CompanyService,
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private purchaseInvoiceService: PurchaseInvoiceService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      company: [null, Validators.required],
      pur_inv: [null, Validators.required],
      total_amount: [null, Validators.required],
      bank: [null, Validators.required],
      created_at: [null, Validators.required],
      payment_mode: [null, Validators.required],
      payment_refrence: [null, Validators.required],
      special_note: [null, Validators.required],
    });
    this.payment = {
      company: '',
      pur_inv: '',
      total_amount: '',
      bank: '',
      created_at: '',
      payment_mode: '',
      payment_refrence: '',
      special_note: '',
      po_order: '',
      po_order_no: '',
      purchase_inv_date: '',
      purchase_inv_no: ''
    };

    this.getCompanyDropdownList();
  }

  getCompanyDropdownList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;
        this.spinner.hide();
      }
    );
  };

  getCompanyBankList(id) {
    this.paymentService.getCompanyBankList(id).subscribe(
      (data: any[]) => {
        this.bankList = data;
        // console.log(this.bankList);
      }
    );
  };

  getCompanyInvoiceList(id) {
    this.paymentService.getCompanyInvoiceList(id).subscribe(
      (data: any[]) => {
        this.invoiceList = data;
        // console.log(this.invoiceList);
      }
    );
  };

  changeCompany(id) {
    if (id > 0) {
      this.getCompanyBankList(id);
      this.getCompanyInvoiceList(id);
    }
  }

  changeInv(id) {
    if (id > 0) {
      for (var i = 0; i < this.invoiceList.length; i++) {
        if (this.invoiceList[i].id == id) {
          this.payment.total_amount = this.invoiceList[i].total_amount;
          this.payment.po_order = this.invoiceList[i].po_order;
          this.payment.po_order_no = this.invoiceList[i].po_order_no[0].purchase_order_no;
          this.payment.purchase_inv_date = this.invoiceList[i].created_at;
          this.payment.purchase_inv_no = this.invoiceList[i].pur_invoice_map[0].purchase_inv_no;
          // console.log(this.invoiceList);
        }
      }
      this.purchaseInvoiceId = id;
    }
  }

  goToList = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addNewPayment() {
    if (this.form.valid) {
      this.spinner.show();
      this.paymentService.addNewPayment(this.payment).subscribe(
        response => {
          this.purchaseInvoiceFinalize()
        },
        error => {
          console.log('error', error)
          // this.toastr.error('everything is broken', '', {
          //   timeOut: 3000,
          // });
        }
      );
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  purchaseInvoiceFinalize() {
    let d;
    d = {
      id: this.purchaseInvoiceId,
      is_finalised: 1
    };
    this.purchaseInvoiceService.finalizePurchaseInvoice(d).subscribe(
      response => {
        this.toastr.success('Payment added successfully', '', {
          timeOut: 3000,
        });
        this.spinner.hide();
        this.goToList('payment');
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  reSet() {
    this.form.reset();
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': !this.form.get(field).valid && this.form.get(field).touched,
      'is-valid': this.form.get(field).valid
    };
  }

}
