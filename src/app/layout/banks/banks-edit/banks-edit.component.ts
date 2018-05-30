import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { BanksService } from '../../../core/services/banks.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';

@Component({
  selector: 'app-banks-edit',
  templateUrl: './banks-edit.component.html',
  styleUrls: ['./banks-edit.component.scss']
})
export class BanksEditComponent implements OnInit {
  banks;
  companyList = [];
  bankList = [];
  form: FormGroup;
  help_heading = "";
  help_description = "";
  constructor(
    private companyService: CompanyService,
    private banksService: BanksService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      company: [null, Validators.required],
      bank_branch: [null, Validators.required],
      bank_name: [null, Validators.required],
      bank_ifsc: [null, Validators.required]
    });
    this.banks = {
      id: '',
      company: '',
      bank_branch: '',
      bank_name: '',
      bank_ifsc: ''
    };

    this.getBankDetails(this.route.snapshot.params['id']);
    this.getCompanyDropdownList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.banksEdit.heading;
      this.help_description = res.data.banksEdit.desc;
    })
  }

  getBankDetails(id) {
    this.banksService.getBankDetails(id).subscribe(
      (data: any[]) => {
        this.banks = data;
        this.spinner.hide();
      }
    );
  }

  getCompanyDropdownList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;
        // console.log(this.companyList);
      }
    );
  };
  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

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
      'is-invalid': !this.form.get(field).valid && this.form.get(field).touched,
      'is-valid': this.form.get(field).valid
    };
  }

  updateBank() {
    if (this.form.valid) {
      this.spinner.show();
      this.banksService.updateBank(this.banks).subscribe(
        response => {
          this.toastr.success('Bank updated successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('banks');
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


}
