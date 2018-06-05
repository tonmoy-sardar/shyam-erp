import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StocksService } from '../../../core/services/stocks.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpService } from '../../../core/services/help.service';
import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-stocks-issue',
  templateUrl: './stocks-issue.component.html',
  styleUrls: ['./stocks-issue.component.scss']
})
export class StocksIssueComponent implements OnInit {
  stockDetails: any;
  form: FormGroup;
  visible_key: boolean;
  help_heading = "";
  help_description = "";
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private stocksService: StocksService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helpService: HelpService
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      stock: ['', Validators.required],
      quantity: ['', Validators.required],
      note: ['', Validators.required],
    });
    this.getStockDetails(this.route.snapshot.params['id']);
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.stockIssue.heading;
      this.help_description = res.data.stockIssue.desc;
    })
  }

  getStockDetails(id) {
    this.stocksService.getStockDetails(id).subscribe(
      (data: any[]) => {
        this.stockDetails = data;
        this.visible_key = true;
        // console.log(this.stockDetails)
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

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getValueCheck(val) {
    if (val > Math.round(this.stockDetails.quantity)) {
      this.toastr.error('Quantity should not be more then available quantity', '', {
        timeOut: 3000,
      });
      this.form.patchValue({
        quantity: Math.round(this.stockDetails.quantity)
      })
      return;
    }
  }

  stockIssue() {
    this.form.patchValue({
      stock: this.stockDetails.id
    })
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      this.stocksService.addNewStockIssue(this.form.value).subscribe(res => {
        this.stockUpdate();
      },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      )
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  stockUpdate() {
    let stock;

    stock = {
      id: this.stockDetails.id,
      quantity: Math.round(this.stockDetails.quantity) - Math.round(this.form.value.quantity)
    };
    // console.log(stock)
    this.stocksService.updateStock(stock).subscribe(
      response => {
        this.toastr.success('Stock issued successfully', '', {
          timeOut: 3000,
        });
        this.loading = LoadingState.Ready;
        this.router.navigateByUrl('/stocks/issue-history/' + this.route.snapshot.params['id']);
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
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

  getAvlChek(val) {
    if (Math.round(val) > 0) {
      return true;
    }
    else {
      return false;
    }
  }

}
