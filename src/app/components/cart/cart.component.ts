import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: CartItem;
  cartTotal: Number;
  subTotal: Number;

  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartInfo$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  ChangeQuantity(id: number, increaseQuantity: Boolean) {
    this.cartService.UpdateCartData(id, increaseQuantity);
  }

}
