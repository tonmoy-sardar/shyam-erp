import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../core/services/login.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(
      private loginService: LoginService,
      public router: Router,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          username: [null, Validators.required],
          password: [null, Validators.required]
      });
  }

  goToPage = function (toNav) {
      this.router.navigateByUrl('/' + toNav);
  };

  onLoggedin() {
      if (this.form.valid) {
          this.spinner.show();
          this.loginService.login(this.form.value).subscribe(
              response => {
                  this.spinner.hide();
                  this.toastr.success('Login successfully', '', {
                      timeOut: 3000,
                  });
                  localStorage.setItem('isLoggedin', 'true');
                  localStorage.setItem('logedUserEmail', response.email);
                  localStorage.setItem('logedUserToken', response.token);
                  localStorage.setItem('logedUserUserId', response.user_id);
                  localStorage.setItem('logedUserUserName', response.username);
                  this.goToPage('dashboard');

              },
              error => {
                  // console.log('error', error)
                  this.spinner.hide();
                  this.toastr.error(error.error.non_field_errors[0], '', {
                    timeOut: 3000,
                  });                    
              }
          );
          // console.log(this.login);
          //localStorage.setItem('isLoggedin', 'true');
      } else {
          Object.keys(this.form.controls).forEach(field => {
              const control = this.form.get(field);
              control.markAsTouched({ onlySelf: true });
          });
      }

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
