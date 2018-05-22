import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GstRatesService } from '../../../core/services/gst-rates.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-gst-rates-add',
  templateUrl: './gst-rates-add.component.html',
  styleUrls: ['./gst-rates-add.component.scss']
})
export class GstRatesAddComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private gstRatesService: GstRatesService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.form = new FormGroup({
      gst_pattern: new FormControl('', Validators.required),
      igst: new FormControl(0, Validators.required),
      cgst: new FormControl('', Validators.required),
      sgst: new FormControl('', Validators.required)
    });
    this.spinner.hide();
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/'+toNav);
  };


  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  GetIgst(cgst, sgst){    
    if(cgst != "" && sgst != ""){
      this.form.patchValue({
        igst: parseFloat(cgst) + parseFloat(sgst)
      })
    }
  }
  addNewGstRate() {
    if (this.form.valid) {
      this.spinner.show();
      this.gstRatesService.addNewGST(this.form.value).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('GST rates added successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('gst-rates');
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

  reSet() {
    this.form.reset();
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched),
      'is-valid': this.form.controls[field].valid && (this.form.controls[field].dirty || this.form.controls[field].touched)
    };
  }
}
