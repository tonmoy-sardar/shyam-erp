import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class MaterialTransferService {

  constructor(private http: HttpClient) { }

  addNewMaterialTransfer(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'material_transfer/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getMaterialTransferList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'material_transfer/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

}
