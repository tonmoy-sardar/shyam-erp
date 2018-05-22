import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-storage-bin-add',
  templateUrl: './storage-bin-add.component.html',
  styleUrls: ['./storage-bin-add.component.scss']
})
export class StorageBinAddComponent implements OnInit {
  @Output() showStorageBinList = new EventEmitter();

  companyStorageBin;
  companyBranchList;
  companyStorageList;
  UOMList;
  form: FormGroup;
  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      bin_no: [null, Validators.required],
      bin_volume: [null, Validators.required],
      branch: [null, Validators.required],
      storage: [null, Validators.required],
      uom: [null, Validators.required]
    });
    this.companyStorageBin = {
      bin_no: '',
      bin_volume: '',
      branch: '',
      storage: '',
      uom: '',
      company: this.route.snapshot.params['id']
    };
    this.getCompanyBranchList(this.route.snapshot.params['id']);
    this.getCompanyStorageList(this.route.snapshot.params['id']);
    this.getUOMList();
  }

  addNewCompanyStorageBin = function () {
    if (this.form.valid) {
      this.companyService.addNewCompanyStorageBin(this.companyStorageBin).subscribe(
        response => {
          this.toastr.success('Storeage bin added successfully', '', {
            timeOut: 3000,
          });
          this.showStorageBinList.emit();
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

  btnClickNav = function () {
    this.showStorageBinList.emit();
  };

  getCompanyBranchList = function (id) {
    this.companyService.getCompanyBranchList(id).subscribe(
      (data: any[]) => {
        this.companyBranchList = data['results'];
        // console.log(this.companyBranchList);
      }
    );
  };

  getCompanyStorageList = function (id) {
    this.companyService.getCompanyStorageList(id).subscribe(
      (data: any[]) => {
        this.companyStorageList = data['results'];
        // console.log(this.companyStorageList);
      }
    );
  };

  getUOMList = function () {
    this.companyService.getUOMList().subscribe(
      (data: any[]) => {
        this.UOMList = data['results'];
        // console.log(this.UOMList);
      }
    );
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
