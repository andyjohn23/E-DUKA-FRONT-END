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
    return this.http.get(this.baseurl + '/api/v1/products/');
  }

  getProduct(): Observable<any> {
    return this.http.get(this.baseurl + '/api/v1/products/<int:pk>');
  }
}
