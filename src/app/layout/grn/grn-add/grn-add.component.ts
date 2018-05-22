import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GrnService } from '../../../core/services/grn.service';
import { PurchaseOrdersService } from '../../../core/services/purchase-orders.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grn-add',
  templateUrl: './grn-add.component.html',
  styleUrls: ['./grn-add.component.scss']
})
export class GrnAddComponent implements OnInit {
  model: any;
  form: FormGroup;
  grn_detail: any[] = [];
  purchaseOrderList: any[] = [];
  visible_key: boolean;
  material_details_list: any[] = [];
  purchase_order_details: any
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private purchaseOrdersService: PurchaseOrdersService,
    private grnService: GrnService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      po_order: ['', Validators.required],
      pur_org: ['', Validators.required],
      pur_grp: ['', Validators.required],
      company: ['', Validators.required],
      vendor: ['', Validators.required],
      vendor_address: ['', Validators.required],
      waybill_no: ['', Validators.required],
      vehicle_no: ['', Validators.required],
      check_post: ['', Validators.required],
      challan_no: ['', Validators.required],
      challan_date: ['', Validators.required],
      grn_detail: this.formBuilder.array([])
    });
    this.getPurchaseOrderList()
  }

  getPurchaseOrderList() {
    this.purchaseOrdersService.getPurchaseOrderListWithoutPagination().subscribe(res => {
      this.purchaseOrderList = res;
      this.spinner.hide();
    })
  }

  purchaseOrderChange(id) {
    this.spinner.show();
    const grn_detail_control = <FormArray>this.form.controls['grn_detail'];
    if (id) {
      this.clearFormArray(grn_detail_control)
      this.purchase_order_details = '';
      this.material_details_list = [];
      this.visible_key = false;
      this.purchaseOrdersService.getPurchaseOrderDetails(id).subscribe(res => {
        this.purchase_order_details = res;
        this.purchase_order_details.purchase_order_detail.forEach(x => {
          var Mdtl = {
            material: x.material.id,
            uom: x.uom,
            order_quantity: x.order_quantity,
            receive_quantity: '',
            company_branch: x.company_branch.id,
            storage_location: x.storage_location.id,
            storage_bin: x.storage_bin.id
          }
          this.material_details_list.push(Mdtl)
        })
        this.form.patchValue({
          po_order: this.purchase_order_details.id,
          pur_org: this.purchase_order_details.pur_org.id,
          pur_grp: this.purchase_order_details.pur_grp.id,
          company: this.purchase_order_details.company.id,
          vendor: this.purchase_order_details.vendor.id,
          vendor_address: this.purchase_order_details.vendor_address.id,
        })
        this.visible_key = true;
        this.spinner.hide();
      })
    }
    else {
      this.clearFormArray(grn_detail_control);
      this.material_details_list = [];
      this.visible_key = false;
      this.spinner.hide();
    }

  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  // gnr deatils
  create_grn_detail(mat) {
    return this.formBuilder.group({
      company_branch: [mat.company_branch.id, Validators.required],
      storage_location: [mat.storage_location.id, Validators.required],
      storage_bin: [mat.storage_bin.id, Validators.required],
      material: [mat.material.id, Validators.required],
      uom: [mat.uom, Validators.required],
      receive_quantity: ['', Validators.required],
      order_quantity: [mat.order_quantity, Validators.required]
    });
  }

  add_grn_detail(mat) {
    const control = <FormArray>this.form.controls['grn_detail'];
    control.push(this.create_grn_detail(mat));
  }

  delete_grn_detail(index: number) {
    const control = <FormArray>this.form.controls['grn_detail'];
    control.removeAt(index);
  }

  matCheck(val, mat) {
    if (val.currentTarget.checked) {
      this.add_grn_detail(mat)
    } else {
      var index = this.form.value.grn_detail.findIndex(p => p.material == mat.material.id)
      this.delete_grn_detail(index)
    }
  }

  GnrQuantity(order_quantity, receive_quantity, i){
    if (Math.round(receive_quantity) > Math.round(order_quantity)) {
      this.material_details_list[i].receive_quantity = Math.round(order_quantity)
      this.toastr.error('Please enter less then PO quantity', '', {
        timeOut: 3000,
      });
    }
  }
  addGrn(){
    if (this.form.value.grn_detail.length == 0) {
      this.toastr.error('Check atleast one item from list of item/s', '', {
        timeOut: 3000,
      });
      return;
    }
    const grn_detail_control = <FormArray>this.form.controls['grn_detail'];
    this.material_details_list.forEach(x => {
      if(x.receive_quantity == ""){
        this.toastr.error('GRN quantity is required in every selected row ', '', {
          timeOut: 3000,
        });
        return;
      }      
      var Mindex = this.form.value.grn_detail.findIndex(p => p.material == x.material)
      if (Mindex > -1) {
        grn_detail_control.at(Mindex).patchValue({
          material: x.material,
          order_quantity: x.order_quantity,
          receive_quantity: x.receive_quantity,
          company_branch: x.company_branch,
          storage_location: x.storage_location,
          storage_bin: x.storage_bin
        });
      }
    })
    if (this.form.valid) {
      this.spinner.show();
      var challanDate = new Date(this.form.value.challan_date.year,this.form.value.challan_date.month-1,this.form.value.challan_date.day)
      this.form.patchValue({
        challan_date: challanDate.toISOString()
      })
      // console.log(this.form.value)
      this.grnService.addNewGrn(this.form.value).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('GNR added successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('grn');
        },
        error => {
          console.log('error', error)
          // this.toastr.error('everything is broken', '', {
          //   timeOut: 3000,
          // });
        }
      );
    } else {
      this.markFormGroupTouched(this.form)      
    }
  }
  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  reSet() {
    this.form.reset();
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
    };
  }
}
