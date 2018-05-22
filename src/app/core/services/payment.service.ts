import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class PaymentService {

  constructor(private http: HttpClient) { }

  addNewPayment(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'payment/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getPaymentList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_payment/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  } 

  approveDisapprovePayment(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'payment/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getCompanyBankList(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'company_specific_bank_dropdown/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  } 

  getCompanyInvoiceList(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'company_specific_invoice_dropdown/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  } 

}
