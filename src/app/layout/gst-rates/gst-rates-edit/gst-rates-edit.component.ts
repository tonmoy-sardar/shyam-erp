import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GstRatesService } from '../../../core/services/gst-rates.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-gst-rates-edit',
  templateUrl: './gst-rates-edit.component.html',
  styleUrls: ['./gst-rates-edit.component.scss']
})
export class GstRatesEditComponent implements OnInit {

  gstRates;
  form: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private gstRatesService: GstRatesService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      gst_pattern: new FormControl('', Validators.required),
      igst: new FormControl('', Validators.required),
      cgst: new FormControl('', Validators.required),
      sgst: new FormControl('', Validators.required)
    });
    this.gstRates = {
      gst_pattern: '',
      igst: '',
      cgst: '',
      sgst: ''
    };
    this.getGSTRates(this.route.snapshot.params['id']);
  }

  getGSTRates(id) {
    this.gstRatesService.getGSTDetails(id).subscribe(
      (data: any[]) => {
        this.gstRates = data;
      }
    );
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
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

  updateGstRate() {
    if (this.form.valid) {
      this.gstRatesService.updateGST(this.gstRates).subscribe(
        response => {
          this.toastr.success('GST rate updated successfully', '', {
            timeOut: 3000,
          });
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
      'is-invalid': !this.form.get(field).valid && this.form.get(field).touched,
      'is-valid': this.form.get(field).valid
    };
  }

}
