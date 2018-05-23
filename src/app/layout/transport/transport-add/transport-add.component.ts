import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatesService } from '../../../core/services/states.service';
import { CompanyService } from '../../../core/services/company.service';
import { TransportService } from '../../../core/services/transport.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transport-add',
  templateUrl: './transport-add.component.html',
  styleUrls: ['./transport-add.component.scss']
})
export class TransportAddComponent implements OnInit {
  form: FormGroup;
  companyList = [];
  storageList = [];
  stateList = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private transportService: TransportService,
    private companyService: CompanyService,
    private statesService: StatesService,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit() {
    this.spinner.show();
    this.form = new FormGroup({
      transporter_name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12)
      ]),
      company: new FormControl('', Validators.required),
      storage: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pan: new FormControl('', Validators.required),
      pin: new FormControl('', Validators.required),
      gstin: new FormControl('', Validators.required),
      amount_credit: new FormControl('', Validators.required),
      amount_debit: new FormControl('', Validators.required)
    });
    this.getCompanyList();
    this.getStateList();
  }

  btnClickNav= function (toNav) {
    this.router.navigateByUrl('/'+toNav);
  };

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  getStateList() {
    this.statesService.getStateActiveList().subscribe(res => {
        this.stateList = res;
        this.spinner.hide();
      }
    );
  };
  getCompanyStorageDropdownList(id){
    this.companyService.getCompanyStorageDropdownList(id).subscribe(
      (data: any[]) =>{   
        this.storageList = data;
      }
     );
  };
  companyChange(id){
    if(id){
      this.getCompanyStorageDropdownList(id)
    }
  }
  getCompanyList() {
    this.companyService.getCompanyDropdownList().subscribe(
      (data: any[]) => {
        this.companyList = data;
        // console.log(this.companyList);
      }
    );
  };
  addNewTransport() {
    if (this.form.valid) {
      this.spinner.show();
      this.transportService.addNewTransporter(this.form.value).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('Transporter added successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('transport');
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
      'is-invalid': this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched),
      'is-valid': this.form.controls[field].valid && (this.form.controls[field].dirty || this.form.controls[field].touched)
    };
  }

}
