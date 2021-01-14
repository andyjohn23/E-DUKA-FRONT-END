import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartData: CartItem;
  cartTotal: Number;
  showSpinner: Boolean;
  checkoutForm: any;
  constructor(private cartService: CartService, private orderService: OrderService, private router: Router,
    private spinner: NgxSpinnerService,
    private form: FormBuilder) {

    this.checkoutForm = this.form.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.cartService.cartInfo$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  // onCheckout() {
  //   this.spinner.show().then(p => {
  //     this.cartService.CheckoutFromCart(1);
  //   });
  // }

}
