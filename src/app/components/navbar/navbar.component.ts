import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartData: CartItem;
  cartTotal: Number;

  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });
    this.cartService.cartInfo$.subscribe(data => this.cartData = data);
  }
}
