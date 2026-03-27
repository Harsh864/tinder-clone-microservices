import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AllProfiles {
  email: string,
  name: string;
  age: number;
  bio: string;
  imageUrl: string;
  gender: string;
}

@Injectable({
  providedIn: 'root',
})
export class Profile {

  constructor(private http: HttpClient) {}

  baseUrl: string = "http://localhost:8082/profile";

  getAllProfile(email: string): Observable<AllProfiles[]> {
    return this.http.get<AllProfiles[]>(this.baseUrl + "/allProfile/" + email);
  }

}
