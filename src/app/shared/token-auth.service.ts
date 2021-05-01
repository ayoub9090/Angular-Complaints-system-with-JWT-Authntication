import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class TokenAuthService {

  private tokenIssuer = {
    login: environment.API_ENDPOINT + 'api/auth/signin',
    register: environment.API_ENDPOINT + 'api/auth/signup'
  }

  constructor() { }

  setTokenStorage(token) {
    localStorage.setItem('auth_token', token);
  }

  setUserRoleStorage(role) {
    localStorage.setItem('role', role);
  }

  getJwtToken() {
    return localStorage.getItem('auth_token');
  }

  getUserRole() {
    return localStorage.getRole('role');
  }

  // Validate token
  validateToken() {
    const token = this.getJwtToken();

    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.tokenIssuer).indexOf(payload.iss) > -1 ? true : false;
      }
    } else {
      return false;
    }
  }

  payload(token) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state
  isSignedin() {
    return this.validateToken();
  }

  // Destroy token
  destroyToken() {
    localStorage.removeItem('auth_token');
  }

}
