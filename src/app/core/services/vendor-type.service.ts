import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class VendorTypeService {

  constructor(private http: HttpClient) { }

  addNewVendortype(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'all_vendor_type/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getVendortypeList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_vendor_type/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getVendortypeActiveList(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'active_vendor_type/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getVendortypeDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_vendor_type/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateVendortype(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'all_vendor_type/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveVendortype(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'all_vendor_type/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteVendortype(data): Observable<any>{
    return this.http.delete(environment.apiEndpoint+'all_vendor_type/'+data.id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  

}
