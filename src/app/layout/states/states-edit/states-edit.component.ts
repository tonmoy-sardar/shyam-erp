import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatesService } from '../../../core/services/states.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-states-edit',
  templateUrl: './states-edit.component.html',
  styleUrls: ['./states-edit.component.scss']
})
export class StatesEditComponent implements OnInit {
  states;
  state;
  form: FormGroup;
  constructor(
    private statesService: StatesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.states = {
      id: '',
      state_name: '',
      tin_number: '',
      state_code: ''
    };
    this.form = this.formBuilder.group({
      state_name: [null, Validators.required],
      tin_number: [null, Validators.required],
      state_code: [null, Validators.required]
    });
    this.getStateDetails(this.route.snapshot.params['id']);
  }

  getStateDetails = function (id) {
    this.statesService.getStateDetails(id).subscribe(
      (data: any[]) => {
        this.states = data;
      }
    );
  }

  goToList = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };


  updateState = function () {
    if (this.form.valid) {      
      this.statesService.updateState(this.states).subscribe(
        response => {
          this.toastr.success('State updated successfully', '', {
            timeOut: 3000,
          });
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

  btnClickNav = function (toNav) {
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
}


