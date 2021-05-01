import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment'

export class User {
  name: String;
  email: String;
  password: String;
  password_confirmation: String
}

@Injectable({
  providedIn: 'root'
})

export class JwtService {

  constructor(private http: HttpClient) { }

  signUp(user: User): Observable<any> {
    return this.http.post(environment.API_ENDPOINT + 'api/auth/signup', user);
  }

  logIn(user: User): Observable<any> {
    return this.http.post<any>(environment.API_ENDPOINT + 'api/auth/signin', user);
  }

  profile(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + 'api/auth/user');
  }

}
