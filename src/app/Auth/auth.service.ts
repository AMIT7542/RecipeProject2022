import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const signUpUrl = environment.signUpUrl;
const signInUrl = environment.signiInUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private _http: HttpClient) {}

  signUp(email: string, Password: string): Observable<any> {
    const data = {
      email: email,
      password: Password,
      returnSecureToken: true,
    };
    return this._http.post(`${signUpUrl}`, data);
  }
  signIn(email: string, password: string): Observable<any> {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this._http.post(`${signInUrl}`, data);
  }
  setDataToStorage(data: any) {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('email', data.email);
    localStorage.setItem('idToken', data.idToken);
    localStorage.setItem('registered', data.registered);
    this.loggedIn.next(true);
  }

  getToken() {
    return localStorage.getItem('idToken');
  }
  clearStorage() {
    localStorage.clear();
    this.loggedIn.next(false);
  }
  isLoggedIn() {
    if (localStorage.getItem('loggedIn') === 'true') {
      // this.loggedIn.next(true);
      return true;
    } else {
      // this.loggedIn.next(false);
      return false;
    }
  }
}
