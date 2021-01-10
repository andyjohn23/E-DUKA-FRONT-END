import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseurl = environment.apiUrl;
  apiUrl = environment.fakeApi;

  constructor(private http: HttpClient, private router:Router) { }

  getAllProducts(): Observable<any> {
    return this.http.get(this.apiUrl + '/products/');
  }

  getCategoryProduct(): Observable<any> {
    return this.http.get(this.apiUrl + '/products/category/electronics/');
  }

  getCategoryMavazi(): Observable<any> {
    return this.http.get(this.apiUrl + '/products/category/women clothing/');
  }

  getProduct(id: Number): Observable<any> {
    return this.http.get(this.apiUrl + '/products/' + id);
  }
}
