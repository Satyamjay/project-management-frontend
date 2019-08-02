import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from  'rxjs';
import { environment } from '../../environments/environment';
import { tap } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient:  HttpClient) { }

  login(emailId: string, password: string): Observable<{token: string, userId: string, role: string}> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(`${environment.apiEndpoint}/auth`, {"username": emailId, "password": password}, { headers: headers }).pipe(
        tap(async (res: {token: string, userId: string, role: string}) => {
            if (res.token) {
                await localStorage.setItem("ACCESS_TOKEN", res.token);
                await localStorage.setItem("USER_ID", res.userId);
                await localStorage.setItem("ROLE", res.role)
                this.authSubject.next(true);
            }
        })
    );
  }

  logout(){
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("ROLE");
    this.authSubject.next(false);
  }

  isLoggedIn(): boolean{
    return this.authSubject.value;
  }

  isAdmin(): boolean{
    return this.authSubject.value && localStorage.getItem('ROLE')==='ROLE_ADMIN'
  }
}
