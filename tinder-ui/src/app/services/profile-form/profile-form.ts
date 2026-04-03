import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserProfile {
  bio: string,
  interests: string,
  imageUrl: string
}

@Injectable({
  providedIn: 'root',
})
export class ProfileForm {
  constructor(private http: HttpClient) {}

  baseUrl: string = "http://localhost:9000/profile";

  getUserProfileUpdated(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/user");
  }

  updateUserProfile(userProfile: UserProfile): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/update", userProfile, { responseType: 'text' as 'json'});
  }

}
