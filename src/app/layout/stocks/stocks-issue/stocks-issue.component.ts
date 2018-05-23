import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StocksService } from '../../../core/services/stocks.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-stocks-issue',
  templateUrl: './stocks-issue.component.html',
  styleUrls: ['./stocks-issue.component.scss']
})
export class StocksIssueComponent implements OnInit {
  stockDetails: any;
  form: FormGroup;
  visible_key: boolean
  constructor(
    private stocksService: StocksService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();    
    this.form = this.formBuilder.group({
      
    });
    this.getStockDetails(this.route.snapshot.params['id']);
  }

  getStockDetails(id) {
    this.stocksService.getStockDetails(id).subscribe(
      (data: any[]) => {
        this.stockDetails = data;
        this.visible_key = true
        // console.log(this.stockDetails)
        this.spinner.hide();
      }
    );
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };


  stockIssue() {
    if (this.form.valid) {
      
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
