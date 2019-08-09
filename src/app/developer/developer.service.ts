import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private httpClient: HttpClient) { }

  // Developer APIs
  getAllDevelopers(): Observable<any []> {
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`});
    return this.httpClient.get<any []>(`${environment.apiEndpoint}/api/developers`, { headers:  headers});
  }

  addProject(data): Observable<any>{
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`});
    let invitations = data.developers.map( function(val){
        return val.id;
    })
    let body = {"name": data.name, "description": data.description, "technologies":data.technologiesUsed, "invitations":invitations, "expectedCompletion": data.expectedCompletion};
    return this.httpClient.post<any>(`${environment.apiEndpoint}/api/developers/${localStorage.getItem('USER_ID')}/projects`, body, { headers: headers });
  }

  getAllProjects(): Observable<any []> {
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`});
    return this.httpClient.get<any []>(`${environment.apiEndpoint}/api/developers/${localStorage.getItem('USER_ID')}/projects`, { headers:  headers});
  }

  deleteProject(id: number): Observable<any>{
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`});
    return this.httpClient.delete<any>(`${environment.apiEndpoint}/api/developers/${localStorage.getItem('USER_ID')}/projects/${id}`, { headers: headers });
  }

}