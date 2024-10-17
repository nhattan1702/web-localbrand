import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient} from "@angular/common/http";

const BASE_URL = environment.apiGateway;

@Injectable({
  providedIn: 'root'
})
export class SoftwareBaseService {
  constructor(
    protected http: HttpClient
  ) {
  }

  protected get(url: string): Observable<any> {
    return this.http.get(BASE_URL + url);
  }

  protected post(url: string, body: object): Observable<any> {
    return this.http.post(BASE_URL + url, body);
  }

  protected put(url: string, body: object): Observable<any> {
    return this.http.put(BASE_URL + url, body);
  }

  protected delete(url: string, id: string): Observable<any> {
    return this.http.delete(BASE_URL + url, {params: {id: id}});
  }
}
