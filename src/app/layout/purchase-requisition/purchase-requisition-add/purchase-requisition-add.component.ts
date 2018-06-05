import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

import { PurchaseRequisitionService } from '../../../core/services/purchase-requisition.service';
import { CompanyService } from '../../../core/services/company.service';
import { PurchaseOrganizationService } from '../../../core/services/purchase-organization.service';
import { PurchaseGroupService } from '../../../core/services/purchase-group.service';
import { MaterialService } from '../../../core/services/material.service';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

import * as _ from "lodash";

@Component({
  selector: 'app-purchase-requisition-add',
  templateUrl: './purchase-requisition-add.component.html',
  styleUrls: ['./purchase-requisition-add.component.scss']
})
export class PurchaseRequisitionAddComponent implements OnInit {
  form: FormGroup;
  items: FormArray;
  UOMList = [];
  purchaseGroupList = [];
  purchaseOrganizationList = [];
  purchaseOrganizationCompanyList = [];
  purchaseOrganizationMaterialList = [];
  companyBranchDropdownList = [];
  companyStorageDropdownList = [];
  companyStoragebinDropdownList = [];
  purchaseRequisition;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private purchaseRequisitionService: PurchaseRequisitionService,
    private materialService: MaterialService,
    private purchaseOrganizationService: PurchaseOrganizationService,
    private purchaseGroupService: PurchaseGroupService,
    private companyService: CompanyService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private helpService: HelpService
  ) { }


  ngOnInit() {
    this.purchaseRequisition = {
      purchase_organization: '',
      company: ''
    }
    this.form = this.formBuilder.group({
      purchase_org: ['', Validators.required],
      purchase_grp: ['', Validators.required],
      company: ['', Validators.required],
      created_at: ['', Validators.required],
      special_note: ['', Validators.required],
      requisition_detail: this.formBuilder.array([this.createRequisitionDetail()])
    });

    //
    this.getUOMList();
    this.getPurchaseGroupActiveList();
    this.getPurchaseOrganizationActiveList();

    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.purchaseRequisitionAdd.heading;
      this.help_description = res.data.purchaseRequisitionAdd.desc;
    })
  }

  createRequisitionDetail() {
    return this.formBuilder.group({
      material: ['', Validators.required],
      quantity: ['', Validators.required],
      uom: ['', Validators.required],
      branch: ['', Validators.required],
      storage_location: ['', Validators.required],
      storage_bin: ['', Validators.required]
    });
  }

  getRequisitionDetail(form) {
    return form.get('requisition_detail').controls
  }
  addRequisitionDetail() {

    const control = <FormArray>this.form.controls['requisition_detail'];
    control.push(this.createRequisitionDetail());
  }

  deleteRequisitionDetail(index: number) {
    const control = <FormArray>this.form.controls['requisition_detail'];
    control.removeAt(index);
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addPurchaseRequisition() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      var requisition_all_detail = _.cloneDeep(this.form.value.requisition_detail)
      for (var i = 0; i < requisition_all_detail.length; i++) {
        var form_data = _.cloneDeep(this.form.value);
        form_data.requisition_detail = []
        form_data.requisition_detail[0] = requisition_all_detail[i];
        this.insertRequisition(form_data, i, requisition_all_detail.length)
      }

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

  insertRequisition(obj, i, n) {
    this.purchaseRequisitionService.addNewPurchaseRequisition(obj).subscribe(
      response => {
        if (i == n - 1) {
          this.toastr.success('Material added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('purchase-requisition');
        }
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    )
  }

  goToList(toNav) {
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
      'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
    };
  }

  getUOMList() {
    this.companyService.getUOMList().subscribe(
      (data: any[]) => {
        this.UOMList = data['results'];

      }
    );
  };

  getCompanyBranchDropdownList(id) {
    this.companyService.getCompanyBranchDropdownList(id).subscribe(
      (data: any[]) => {
        this.companyBranchDropdownList = data;
        // console.log(this.companyBranchDropdownList)
      }
    );
  };

  getCompanyStorageDropdownList(id) {
    this.companyService.getCompanyStorageDropdownList(id).subscribe(
      (data: any[]) => {
        this.companyStorageDropdownList = data;
        // console.log(this.companyStorageDropdownList)
      }
    );
  };

  getCompanyStoragebinDropdownList(id) {
    this.companyService.getCompanyStoragebinDropdownList(id).subscribe(
      (data: any[]) => {
        this.companyStoragebinDropdownList = data;
        // console.log(this.companyStoragebinDropdownList)
      }
    );
  };

  getPurchaseGroupActiveList() {
    this.purchaseGroupService.getPurchaseGroupActiveList().subscribe(
      (data: any[]) => {
        this.purchaseGroupList = data;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

  getPurchaseOrganizationActiveList() {
    this.purchaseOrganizationService.getPurchaseOrganizationActiveList().subscribe(
      (data: any[]) => {
        this.purchaseOrganizationList = data;
        this.loading = LoadingState.Ready;
      }
    );
  }

  getPurchaseOrganizationCompanyList(id) {
    this.purchaseOrganizationService.getPurchaseOrganizationCompanyList(id).subscribe(
      (data: any[]) => {
        this.purchaseOrganizationCompanyList = data;
        // console.log(this.purchaseOrganizationCompanyList);
      }
    );
  }

  getPurchaseOrganizationMaterialList(id) {
    this.purchaseOrganizationService.getPurchaseOrganizationMaterialList(id).subscribe(
      (data: any[]) => {
        this.purchaseOrganizationMaterialList = data;
        // console.log(this.purchaseOrganizationMaterialList);
      }
    );
  }

  changePurchaseOrganization(id) {
    if (id > 0) {
      this.getPurchaseOrganizationCompanyList(id);
      this.getPurchaseOrganizationMaterialList(id);
    }
  }

  changeCompany(id) {
    if (id > 0) {
      this.getCompanyBranchDropdownList(id);
      this.getCompanyStorageDropdownList(id);
      this.getCompanyStoragebinDropdownList(id)
    }
  }


}
