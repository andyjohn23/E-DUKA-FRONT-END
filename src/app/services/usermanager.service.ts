import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsermanagerService {
  loginUrl = environment.apiUrl;
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      alert(error.error.non_field_errors);

    }
    return throwError('Oops!!, please try again later.');
  }

  authenticate(email: string, password: string) {
    const data = { 'email': email, 'password': password };
    return this.http.post(this.loginUrl + '/api/token/', data, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }
}
