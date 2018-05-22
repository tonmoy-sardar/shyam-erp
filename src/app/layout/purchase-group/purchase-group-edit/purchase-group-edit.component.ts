import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseGroupService } from '../../../core/services/purchase-group.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purchase-group-edit',
  templateUrl: './purchase-group-edit.component.html',
  styleUrls: ['./purchase-group-edit.component.scss']
})
export class PurchaseGroupEditComponent implements OnInit {
  purchaseGroup;
  form: FormGroup;
  constructor(
    private purchaseGroupService: PurchaseGroupService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.purchaseGroup = {
      id: '',
      name: '',
      description: ''
    };
    this.getPurchaseGroupDetails(this.route.snapshot.params['id']);
  }

  getPurchaseGroupDetails = function (id) {
    this.purchaseGroupService.getPurchaseGroupDetails(id).subscribe(
      (data: any[]) => {
        this.purchaseGroup = data;
        this.spinner.hide();
      }
    );
  }

  goToList = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };


  updatePurchaseGroup = function () {
    if (this.form.valid) {
      this.spinner.show();
      this.purchaseGroupService.updatePurchaseGroup(this.purchaseGroup).subscribe(
        response => {
          this.toastr.success('Purchase group updated successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('purchase-group');
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
  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  
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
