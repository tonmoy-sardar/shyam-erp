import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

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
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService
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
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.storageBinAdd.heading;
      this.help_description = res.data.storageBinAdd.desc;
    })
  }

  addNewCompanyStorageBin() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.companyService.addNewCompanyStorageBin(this.companyStorageBin).subscribe(
        response => {
          this.toastr.success('Storeage bin added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.showStorageBinList.emit();
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }

  }

  btnClickNav() {
    this.showStorageBinList.emit();
  };

  getCompanyBranchList(id) {
    this.companyService.getCompanyBranchDropdownList(id).subscribe(
      (data: any[]) => {
        this.companyBranchList = data;
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  getCompanyStorageList(id) {
    this.companyService.getCompanyStorageDropdownList(id).subscribe(
      (data: any[]) => {
        this.companyStorageList = data;
        // console.log(this.companyStorageList);
      }
    );
  };

  getUOMList() {
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
