import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-storage-bin-edit',
  templateUrl: './storage-bin-edit.component.html',
  styleUrls: ['./storage-bin-edit.component.scss']
})
export class StorageBinEditComponent implements OnInit {
  @Input() companyStorageBinId: number;

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
    // console.log(this.companyStorageBinId);

    this.companyStorageBin = {
      id: '',
      bin_no: '',
      bin_volume: '',
      branch: '',
      storage: '',
      uom: '',
      company: this.route.snapshot.params['id']
    };

    this.getCompanyStorageBinDetails(this.companyStorageBinId);
    this.getCompanyBranchList(this.route.snapshot.params['id']);
    this.getCompanyStorageList(this.route.snapshot.params['id']);
    this.getUOMList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.storageBinEdit.heading;
      this.help_description = res.data.storageBinEdit.desc;
    })
  }
  getCompanyStorageBinDetails(id) {

    this.companyService.getCompanyStorageBinDetails(id).subscribe(
      (data: any[]) => {
        this.companyStorageBin = data;
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

  updateCompanyStorageBin() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.companyService.updateCompanyStorageBin(this.companyStorageBin).subscribe(
        response => {
          //this.goToList('states');
          this.toastr.success('Storeage bin updated successfully', '', {
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
        // console.log(this.companyBranchList);
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
