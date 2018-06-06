import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialGroupService } from '../../../core/services/material-group.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import * as Globals from '../../../core/globals';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-material-group-add',
  templateUrl: './material-group-add.component.html',
  styleUrls: ['./material-group-add.component.scss']
})
export class MaterialGroupAddComponent implements OnInit {

  form: FormGroup;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private materialGroupService: MaterialGroupService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      material_type: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(
      res => {
        this.help_heading = res.data.materialGroupAdd.heading;
        this.help_description = res.data.materialGroupAdd.desc;
        this.loading = LoadingState.Ready;
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

  addNewMaterialGroup() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.materialGroupService.addNewMaterialGroup(this.form.value).subscribe(
        response => {
          this.toastr.success('Material group added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('material-group');
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
  reSet() {
    this.form.reset();
  }
  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };
  isFieldValid(field: string) {
    return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
    };
  }

}
