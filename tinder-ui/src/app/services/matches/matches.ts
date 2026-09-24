import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Matches {
  constructor(private http: HttpClient) {}

  baseUrl: string = "https://api-gateway-deploy-v1.onrender.com"

  swipeUser(user2: string, type: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/match/swipe/" + user2 + "/" + type, {respomseType: 'text' as 'json'});
  }
}
