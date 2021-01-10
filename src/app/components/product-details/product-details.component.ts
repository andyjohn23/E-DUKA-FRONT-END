import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { productModel } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productID = 0;
  productData: productModel;

  constructor(private products: ProductService, private route: ActivatedRoute,
    private message: MessengerService, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.productID = data.id;
    })

    this.products.getProduct(this.productID).subscribe(data => {
      this.productData = data;
    })
  }

  // AddToCart(){
  //   this.cartService.addToCart(this.productData).subscribe(() => {
  //     this.message.sendMessage(this.productData)
  //   })
  // }

  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }

}
