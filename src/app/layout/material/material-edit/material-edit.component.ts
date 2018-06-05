import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, } from '@angular/forms';
import { CompanyService } from '../../../core/services/company.service';
import { PurchaseOrganizationService } from '../../../core/services/purchase-organization.service';
import { PurchaseGroupService } from '../../../core/services/purchase-group.service';
import { MaterialService } from '../../../core/services/material.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.component.html',
  styleUrls: ['./material-edit.component.scss']
})
export class MaterialEditComponent implements OnInit {
  material;
  materialTypeList = [];
  UOMList = [];
  purchaseGroupList = [];
  purchaseOrganizationList = [];
  form: FormGroup;
  is_taxable_value = false;
  visible_key: boolean;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private materialService: MaterialService,
    private purchaseOrganizationService: PurchaseOrganizationService,
    private purchaseGroupService: PurchaseGroupService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      material_type: [null, Validators.required],
      material_code: [null, Validators.required],
      material_fullname: [null, Validators.required],
      material_purchase_org: [null, Validators.required],
      material_purchase_grp: [null, Validators.required],
      description: [null, Validators.required],
      material_uom: this.formBuilder.array([this.createmMaterialUom(1)]),
      is_sales: [false],
      is_taxable: [false],
      material_tax: this.formBuilder.array([])
    });

    this.getMaterialDetails(this.route.snapshot.params['id']);
    this.getUOMList();
    this.getMaterialTypeList();
    this.getPurchaseGroupActiveList();
    this.getPurchaseOrganizationActiveList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.materialEdit.heading;
      this.help_description = res.data.materialEdit.desc;
    })
  }

  getMaterialDetails(id) {
    this.materialService.getMaterialDetails(id).subscribe(
      (data: any[]) => {
        this.material = data;
        this.visible_key = true
        console.log(this.material);
        if (this.material.is_sales) {
          this.addMaterialUom(2);
        }
        if (this.material.is_sales && this.material.is_taxable) {
          this.is_taxable_value = true;
          this.addMateriaTax(1);
          this.addMateriaTax(2);
        }
        else if (this.material.is_taxable) {
          this.is_taxable_value = true;
          this.addMateriaTax(1);
        }

        let material_purchase_org_arr = [];
        this.material.material_purchase_org.forEach(x => {
          material_purchase_org_arr.push(x.pur_org);
        })
        this.material.material_purchase_org = material_purchase_org_arr;

        let material_purchase_grp_arr = [];
        this.material.material_purchase_grp.forEach(k => {
          material_purchase_grp_arr.push(k.pur_group);
        })
        this.material.material_purchase_grp = material_purchase_grp_arr;
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

  getMaterialUom(form) {
    return form.get('material_uom').controls
  }

  createmMaterialUom(for_id) {
    return this.formBuilder.group({
      material_for: for_id,
      base_uom: ['', Validators.required],
      unit_per_uom: ['', Validators.required],
      unit_uom: ['', Validators.required]
    });
  }

  addMaterialUom(id) {
    const control = <FormArray>this.form.controls['material_uom'];
    control.push(this.createmMaterialUom(id));
  }

  deleteMaterialUom(index: number) {
    const control = <FormArray>this.form.controls['material_uom'];
    control.removeAt(index);
  }

  showHideMaterialUOM(val) {
    var mat_uom = {
      base_uom: '',
      id: '',
      material_for: '',
      unit_per_uom: '',
      unit_uom: ''
    }
    var mat_tax = {
      tax_for: '',
      igst: '',
      cgst: '',
      sgst: '',
      hsn: ''
    }
    if (val.currentTarget.checked) {
      this.material.material_uom.push(mat_uom)
      this.addMaterialUom(2);
      if (this.form.value.is_taxable == true) {
        this.material.material_tax.push(mat_tax)
        this.addMateriaTax(2);
      }
    }
    else {
      this.deleteMaterialUom(1);
      this.material.material_uom.splice(1, 1)
      if (this.form.value.is_taxable == true) {
        this.deleteMaterialTax(1);
        this.material.material_tax.splice(1, 1)
      }
    }
  }


  getMateriaTax(form) {
    return form.get('material_tax').controls
  }

  createmMaterialTax(for_id) {
    return this.formBuilder.group({
      tax_for: for_id,
      igst: ['', Validators.required],
      cgst: ['', Validators.required],
      sgst: ['', Validators.required],
      hsn: ['', Validators.required]
    });
  }

  addMateriaTax(id) {
    const control = <FormArray>this.form.controls['material_tax'];
    control.push(this.createmMaterialTax(id));
  }

  deleteMaterialTax(index: number) {
    const control = <FormArray>this.form.controls['material_tax'];
    control.removeAt(index);
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  showHideMaterialTax(val) {
    var mat_tax = {
      tax_for: '',
      igst: '',
      cgst: '',
      sgst: '',
      hsn: ''
    }
    if (val.currentTarget.checked) {
      this.material.material_tax.splice(0, 0, mat_tax)
      this.addMateriaTax(1);
      if (this.form.value.is_sales == true) {
        var mat_tax2 = {
          tax_for: '',
          igst: '',
          cgst: '',
          sgst: '',
          hsn: ''
        }
        this.material.material_tax.splice(1, 0, mat_tax2)
        this.addMateriaTax(2);

      }
      this.is_taxable_value = true;
    }
    else {
      this.material.material_tax = []
      const material_tax_control = <FormArray>this.form.controls['material_tax'];
      this.clearFormArray(material_tax_control);
      this.is_taxable_value = false;
    }
  }

  getMaterialTypeList() {
    this.materialService.getMaterialTypeList().subscribe(
      (data: any[]) => {
        this.materialTypeList = data['results'];

      }
    );
  }
  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getUOMList() {
    this.companyService.getUOMList().subscribe(
      (data: any[]) => {
        this.UOMList = data['results'];

      }
    );
  };

  getPurchaseGroupActiveList() {
    this.purchaseGroupService.getPurchaseGroupActiveList().subscribe(
      (data: any[]) => {
        this.purchaseGroupList = data;

      }
    );
  }

  getPurchaseOrganizationActiveList() {
    this.purchaseOrganizationService.getPurchaseOrganizationActiveList().subscribe(
      (data: any[]) => {
        this.purchaseOrganizationList = data;
      }
    );
  }

  getIgst(i) {
    console.log(i)
    const material_tax_control = <FormArray>this.form.controls['material_tax'];
    if (this.form.value.material_tax[i].cgst != "" && this.form.value.material_tax[i].sgst != "") {
      material_tax_control.at(i).patchValue({
        igst: parseFloat(this.form.value.material_tax[i].cgst) + parseFloat(this.form.value.material_tax[i].sgst)
      });
    }
  }

  updateMaterial() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      let material_purchase_org_arr = [];
      this.form.value.material_purchase_org.forEach(x => {
        material_purchase_org_arr.push({ pur_org: x });
      })

      let material_purchase_grp_arr = [];
      this.form.value.material_purchase_grp.forEach(k => {
        material_purchase_grp_arr.push({ pur_group: k });
      })

      this.form.value.material_purchase_org = material_purchase_org_arr;
      this.form.value.material_purchase_grp = material_purchase_grp_arr;
      this.form.patchValue({
        material_purchase_org: material_purchase_org_arr,
        material_purchase_grp: material_purchase_grp_arr
      })
      this.materialService.updateMaterial(this.form.value, this.material).subscribe(
        response => {
          this.toastr.success('Material updated successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('material');
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    } else {
      this.markFormGroupTouched(this.form)
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched),
      'is-valid': this.form.controls[field].valid && (this.form.controls[field].dirty || this.form.controls[field].touched)
    };
  }

}
