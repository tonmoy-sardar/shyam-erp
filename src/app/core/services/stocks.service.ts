import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class StocksService {

  constructor(private http: HttpClient) { }

  addNewStock(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'stocks/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getStockList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'stocks/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
