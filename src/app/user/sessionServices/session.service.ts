import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionsResponse } from '../pages/models/session.model';
import { APISMAESTROS, PATHS } from 'src/app/core/http/resources/API-RESOURCES';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  postSession(deliveryPlace: string): Observable<SessionsResponse> {
    const body = {
      deliveryPlace: deliveryPlace
    }

    const url = `${APISMAESTROS}${PATHS.sessions}`;
    return this.http.post<SessionsResponse>(url, body);
  }
}
