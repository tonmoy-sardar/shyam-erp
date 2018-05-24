import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatesService } from '../../../core/services/states.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';

@Component({
  selector: 'app-states-add',
  templateUrl: './states-add.component.html',
  styleUrls: ['./states-add.component.scss']
})
export class StatesAddComponent implements OnInit {
  form: FormGroup;
  help_heading = "";
  help_description = ""; 
  constructor(
    private statesService: StatesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      state_name: [null, Validators.required],
      tin_number: [null, Validators.required],
      state_code: [null, Validators.required]
    });
    this.spinner.hide();
    this.getHelp();
  }

  getHelp(){
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.stateAdd.heading;
      this.help_description = res.data.stateAdd.desc;
    })
  }

  goToList = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  addState = function () {
    if (this.form.valid) {
      this.spinner.show();
      this.statesService.addNewState(this.form.value).subscribe(
        response => {
          this.toastr.success('State added successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('states');          
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
