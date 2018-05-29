import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class EmployeesService {

  constructor(private http: HttpClient) { }

  addNewEmployee(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'employee/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getEmployeeList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_employee/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  

  getEmployeeDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'employee/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateEmployee(data): Observable<any>{
    return this.http.put(environment.apiEndpoint+'employee/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  activeInactiveEmployee(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'employee/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  deleteEmployee(data): Observable<any>{
    return this.http.delete(environment.apiEndpoint+'employee/'+data.id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
