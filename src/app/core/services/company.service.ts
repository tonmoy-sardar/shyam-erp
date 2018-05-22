import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class CompanyService {

  constructor(private http: HttpClient) { }

  // Company Services Start

  getCompanyList(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'companies/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  addNewCompany(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'companies/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getCompanyDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'companies/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateCompany(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'companies/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteCompany(data): Observable<any>{
    return this.http.delete(environment.apiEndpoint+'companies/'+data.id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getCompanyDropdownList(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'company_dropdownlist/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  
  // Company Services End

  // Branch Services Start
  getBranchList(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_branch/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getCompanyBranchList(id,params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'company_branch/'+id+'/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  
  addNewCompanyBranch(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'all_branch/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getCompanyBranchDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_branch/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateCompanyBranch(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'all_branch/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  // Branch Services End

  // Storage Services Start
  getStorageList(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_storage/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getCompanyStorageList(id,params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'company_storage/'+id+'/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  
  addNewCompanyStorage(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'all_storage/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getCompanyStorageDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_storage/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateCompanyStorage(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'all_storage/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  // Branch Services End

  // Storage Bin Services Start
  getStorageBinList(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_storage_bin/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getCompanyStorageBinList(id,params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'company_storagebin/'+id+'/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  
  addNewCompanyStorageBin(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'all_storage_bin/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getCompanyStorageBinDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_storage_bin/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateCompanyStorageBin(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'all_storage_bin/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  // Storage Bin Services End


  // UOM Services Start
  getUOMList(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'uom/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  // UOM Services End

  getCompanyBranchDropdownList(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'company_branch_dropdown/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getCompanyStorageDropdownList(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'company_storage_dropdown/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getCompanyStoragebinDropdownList(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'company_storagebin_dropdown/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
