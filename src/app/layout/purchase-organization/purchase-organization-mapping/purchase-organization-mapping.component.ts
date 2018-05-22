import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrganizationService } from '../../../core/services/purchase-organization.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purchase-organization-mapping',
  templateUrl: './purchase-organization-mapping.component.html',
  styleUrls: ['./purchase-organization-mapping.component.scss']
})
export class PurchaseOrganizationMappingComponent implements OnInit {
  companyBranchTree: any[] = [];
  PurchaseOrganizationMapingList: any[] = []
  constructor(
    private purchaseOrganizationService: PurchaseOrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getCompanyBranchTree();
    this.getPurchaseOragnizationList(this.route.snapshot.params['id'])
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getPurchaseOragnizationList(id){
    this.purchaseOrganizationService.getPurchaseOrganizationMapingList(id).subscribe(res => {
      this.PurchaseOrganizationMapingList = res['results'];
      this.spinner.hide();
    })
  }
  
  getCompanyBranchTree() {
    this.purchaseOrganizationService.getCompanyBranchTree().subscribe(
      (data: any[]) => {
        this.companyBranchTree = data['results'];
        for(var i=0; i< this.companyBranchTree.length; i++){
          for(var j=0; j< this.companyBranchTree[i].company_branch.length; j++){
            var chk = this.PurchaseOrganizationMapingList.findIndex(p => p.branch == this.companyBranchTree[i].company_branch[j].id)
            if(chk > -1){
              this.companyBranchTree[i].company_branch[j]['checked'] = true
            }
            else{
              this.companyBranchTree[i].company_branch[j]['checked'] = false
            }
          }
        }
      }
    );
  };

  updatePurchaseOrganizationMapping() {
    this.spinner.show();
    this.purchaseOrganizationService.deletePurchaseOrganizationMapping(this.route.snapshot.params['id']).subscribe(res => {
      for (var i = 0; i < this.companyBranchTree.length; i++) {
        if (this.companyBranchTree[i].company_branch.filter(item => { return item.checked; }).length > 0) {
          
          var checkedBranch = this.companyBranchTree[i].company_branch.filter(item => { return item.checked; });
          if (checkedBranch.length > 0) {
            for (var j = 0; j < checkedBranch.length; j++) {
              var date = {
                pur_org: this.route.snapshot.params['id'],
                branch: checkedBranch[j].id
              };
              this.setPurchaseOrganizationCompanyBranchMapping(date);
            }
          }
        }
        if(i == this.companyBranchTree.length - 1){
          this.toastr.success('Purchase organization mapping successfully', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.goToList('purchase-organization')
        }
  
      }
    })
    
  }

  setPurchaseOrganizationCompanyBranchMapping(data) {
    this.purchaseOrganizationService.setPurchaseOrganizationCompanyBranchMapping(data).subscribe(
      response => {
        
      },
      error => console.log('error', error)
    );
  }

}
