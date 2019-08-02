import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  // Developer APIs
  getAllDevelopers(): Observable<any []> {
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`});
    return this.httpClient.get<any []>(`${environment.apiEndpoint}/api/developers`, { headers:  headers});
  }

  updateDeveloper(data, id: number): Observable<any>{
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`});
    let body = {"enrollmentNo": data.enrollmentNo, "semester": data.semester, "user":{"lastName": data.lastName, "firstName": data.firstName, "email": data.email}};
    return this.httpClient.put<any>(`${environment.apiEndpoint}/api/developers/${id}`, body, { headers: headers });
  }

  deleteDeveloper(id: number): Observable<any>{
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`});
    return this.httpClient.delete<any>(`${environment.apiEndpoint}/api/developers/${id}`, { headers: headers });
  }

  addDeveloper(data): Observable<any>{
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`});
    let body = {"enrollmentNo": data.enrollmentNo, "semester": data.semester, "user":{"lastName": data.lastName, "firstName": data.firstName, "email": data.email, "password": data.password}};
    return this.httpClient.post<any>(`${environment.apiEndpoint}/api/developers`, body, { headers: headers });
  }

  // Handlers APIs
  getAllHandlers(): Observable<any []> {
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`});
    return this.httpClient.get<any []>(`${environment.apiEndpoint}/api/project-handlers`, { headers:  headers});
  }

  updateHandler(data, id: number): Observable<any>{
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`});
    let body = {"employeeId": data.employeeId, "user":{"lastName": data.lastName, "firstName": data.firstName, "email": data.email}};
    return this.httpClient.put<any>(`${environment.apiEndpoint}/api/project-handlers/${id}`, body, { headers: headers });
  }

  deleteHandler(id: number): Observable<any>{
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`});
    return this.httpClient.delete<any>(`${environment.apiEndpoint}/api/project-handlers/${id}`, { headers: headers });
  }

  addHandler(data): Observable<any>{
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`});
    let body = {"employeeId": data.employeeId, "user":{"lastName": data.lastName, "firstName": data.firstName, "email": data.email, "password": data.password}};
    return this.httpClient.post<any>(`${environment.apiEndpoint}/api/project-handlers`, body, { headers: headers });
  }

}