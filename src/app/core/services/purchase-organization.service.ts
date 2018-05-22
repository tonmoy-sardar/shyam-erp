import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class PurchaseOrganizationService {

  constructor(private http: HttpClient) { }

  addNewPurchaseOrganization(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'all_purchase_organization/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  
  getPurchaseOrganizationList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_purchase_organization/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPurchaseOrganizationDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_purchase_organization/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updatePurchaseOrganization(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'all_purchase_organization/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactivePurchaseOrganization(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'all_purchase_organization/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deletePurchaseOrganization(data): Observable<any>{
    return this.http.delete(environment.apiEndpoint+'all_purchase_organization/'+data.id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getCompanyBranchTree(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'company_branch_tree/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  
  getPurchaseOrganizationMapingList(id){
    return this.http.get(environment.apiEndpoint+'specific_purorg_mapping/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deletePurchaseOrganizationMapping(id){
    return this.http.delete(environment.apiEndpoint+'del_purorg_mapping/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  setPurchaseOrganizationCompanyBranchMapping(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'purchase_org_mapping/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPurchaseOrganizationActiveList(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'purchase_org_active_list/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPurchaseOrganizationCompanyList(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'specific_organisation_company/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPurchaseOrganizationMaterialList(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'specific_organisation_material/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
