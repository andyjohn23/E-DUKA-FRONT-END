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

  constructor(private http: HttpClient, private router:Router) { }

  getAllProducts(): Observable<any> {
    return this.http.get(this.baseurl + '/products/');
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(this.baseurl + '/products/' + id);
  }

  getCategorySubs(id): Observable<any> {
    return this.http.get(this.baseurl + '/category_filter/' + id);
  }

  getSubcategoryProducts(id): Observable<any> {
    return this.http.get(this.baseurl + '/filter_sub_category/' + id);
  }
}
