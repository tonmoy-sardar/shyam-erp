import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatesService } from '../../../core/services/states.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../../core/services/help.service';

@Component({
  selector: 'app-states-edit',
  templateUrl: './states-edit.component.html',
  styleUrls: ['./states-edit.component.scss']
})
export class StatesEditComponent implements OnInit {
  states;
  state;
  form: FormGroup;
  help_heading = "";
  help_description = "";
  constructor(
    private statesService: StatesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.spinner.show();
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
    this.getHelp();
  }

  getHelp(){
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.stateEdit.heading;
      this.help_description = res.data.stateEdit.desc;
    })
  }

  getStateDetails(id) {
    this.statesService.getStateDetails(id).subscribe(
      (data: any[]) => {
        this.states = data;
        this.spinner.hide();
      }
    );
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };


  updateState() {
    if (this.form.valid) {
      this.spinner.show();      
      this.statesService.updateState(this.states).subscribe(
        response => {
          this.toastr.success('State updated successfully', '', {
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

  btnClickNav(toNav) {
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


