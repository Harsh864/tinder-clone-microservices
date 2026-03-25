import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Register {
  name: string,
  age: number,
  password: string,
  gender: string,
  email: string
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(private http: HttpClient) {}

  baseUrl: string = "http://localhost:8081/auth";

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/login", { email, password }, { responseType: 'text' as 'json' });
  }

  registerUser(data: Register): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/register", data, {responseType: 'text' as 'json'});
  }

}
