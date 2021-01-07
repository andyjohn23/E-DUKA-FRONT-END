import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseurl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<any> {
    return this.http.get(this.baseurl + '/api/v1/categories/');
  }

  getAllProducts(): Observable<any> {
    return this.http.get(this.baseurl + '/api/v1/products/');
  }
}
