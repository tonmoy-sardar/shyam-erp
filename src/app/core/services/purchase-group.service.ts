import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class PurchaseGroupService {

  constructor(private http: HttpClient) { }

  addNewPurchaseGroup(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'all_purchase_group/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPurchaseGroupList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_purchase_group/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPurchaseGroupDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_purchase_group/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updatePurchaseGroup(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'all_purchase_group/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactivePurchaseGroup(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'all_purchase_group/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deletePurchaseGroup(data): Observable<any>{
    return this.http.delete(environment.apiEndpoint+'all_purchase_group/'+data.id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPurchaseGroupActiveList(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'purchase_grp_active_list/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
