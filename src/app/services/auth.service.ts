import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = environment.apiUrl;
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, public JwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean{

    const token = localStorage.getItem('token')
    return !this.JwtHelper.isTokenExpired(token);
  }

  AddUser(user): Observable<any> {
    return this.http.post(this.baseurl + '/api/v1/users/', user,
      { headers: this.httpHeaders })
  }
}
