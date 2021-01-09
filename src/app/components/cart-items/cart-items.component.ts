import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { productModel } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  cartItems = [];
  cartTotal = 0;

  constructor(private message: MessengerService, private cartService: CartService) { }

  ngOnInit() {
    this.cartAddition();
    this.loadCartItems();
  }

  cartAddition() {
    this.message.getMessage().subscribe((product: productModel) => {
      this.loadCartItems();
    })
  }

  loadCartItems() {
    this.cartService.getCartItem().subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.cartCalculate();
    })
  }
  
  cartCalculate() {
    this.cartTotal = 0;
    this.cartItems.forEach(item => {
      this.cartTotal += (item.quantity * item.price)
    })
  }

}
