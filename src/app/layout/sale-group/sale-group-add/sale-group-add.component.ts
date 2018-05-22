import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleGroupService } from '../../../core/services/sale-group.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sale-group-add',
  templateUrl: './sale-group-add.component.html',
  styleUrls: ['./sale-group-add.component.scss']
})
export class SaleGroupAddComponent implements OnInit {
  form: FormGroup;
  constructor(
    private saleGroupService: SaleGroupService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
  }
  
  goToList= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  addNewSaleGroup = function(){
    if (this.form.valid) {
      this.saleGroupService.addNewSaleGroup(this.form.value).subscribe(
        response => {
          this.toastr.success('Sale group added successfully', '', {
            timeOut: 3000,
          });
          this.goToList('sale-group');
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

  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
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
