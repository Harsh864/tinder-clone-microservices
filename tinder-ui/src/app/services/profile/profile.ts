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
  interests: string;
}

@Injectable({
  providedIn: 'root',
})
export class Profile {

  constructor(private http: HttpClient) {}

  baseUrl: string = "https://api-gateway-deploy-v1.onrender.com/profile";

  getAllProfile(email: string): Observable<AllProfiles[]> {
    return this.http.get<AllProfiles[]>(this.baseUrl + "/allProfile/" + email);
  }

}
