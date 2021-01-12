import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environment';
import { productModel } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartUrl = environment.cartApi

  constructor(private http: HttpClient) { }

  getCartItem(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.cartUrl).pipe(
      map((result: any[]) => {
        let cartItems: CartItem[] = [];

        let productExits = false

        for (let item of result) {
          let productExits = false

          for (let i in cartItems) {
            if (cartItems[i].id === item.product.id) {
              cartItems[i].quantity++
              productExits = true
              break;
            }
          }

          if (!productExits) {
            cartItems.push(new CartItem(item.id, item.product, item.quantity));
          }
        }
        return cartItems;
      })
    )
  }

  addToCart(product: productModel): Observable<any> {
    return this.http.post(this.cartUrl, { product })
  }
}
