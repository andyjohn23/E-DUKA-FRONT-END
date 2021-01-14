import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, CartItemPublic } from '../models/cart-item';
import { ProductService } from './product.service';
import { productModel } from '../models/product';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseurl = environment.apiUrl;

  private cartData: CartItemPublic = {
    proddata: [{
      inCart: 0,
      id: 0
    }],
    total: 0
  }

  private dataServer: CartItem = {
    data: [{
      product: undefined,
      numInCart: 0
    }],
    total: 0
  }

  cartTotal$ = new BehaviorSubject<Number>(0);
  cartInfo$ = new BehaviorSubject<CartItem>(this.dataServer)


  constructor(private http: HttpClient, private product: ProductService, private router: Router,
    private spinner: NgxSpinnerService, private toast: ToastrService) {
    this.cartTotal$.next(this.dataServer.total);
    this.cartInfo$.next(this.dataServer)

    let info: CartItemPublic = JSON.parse(localStorage.getItem('cart'));

    if (info !== null && info !== undefined && info.proddata[0].inCart !== 0) {
      this.cartData = info;
      this.cartData.proddata.forEach(p => {
        this.product.getProduct(p.id).subscribe((actualProdInfo: productModel) => {
          if (this.dataServer.data[0].numInCart === 0) {
            this.dataServer.data[0].numInCart = p.inCart;
            this.dataServer.data[0].product = actualProdInfo;
            this.CalculateTotal();
            this.cartData.total = this.dataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartData));
          } else {
            this.dataServer.data.push({
              numInCart: p.inCart,
              product: actualProdInfo
            });
            this.CalculateTotal();
            this.cartData.total = this.dataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartData));
          }
          this.cartInfo$.next({ ...this.dataServer });
        });
      });
    }
  }
  
  CalculateSubTotal(index): number {
    let subTotal = 0;

    let p = this.dataServer.data[index];
    // @ts-ignore
    subTotal = p.product.price * p.numInCart;

    return subTotal;
  }

  AddProductToCart(id: number, quantity?: number) {

    this.product.getProduct(id).subscribe(prod => {
      if (this.dataServer.data[0].product === undefined) {
        this.dataServer.data[0].product = prod;
        this.dataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
        this.CalculateTotal();
        this.cartData.proddata[0].inCart = this.dataServer.data[0].numInCart;
        this.cartData.proddata[0].id = prod.id;
        this.cartData.total = this.dataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartData));
        this.cartInfo$.next({ ...this.dataServer });
        this.toast.success(`${prod.item_name} added to the cart.`, "Product Added", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-full-width'
        })
      } else {
        const index = this.dataServer.data.findIndex(p => p.product.id === prod.id);
        if (index !== -1) {
          if (quantity !== undefined && quantity <= prod.quantity) {
            this.dataServer.data[index].numInCart = this.dataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity;
          } else {
            this.dataServer.data[index].numInCart < this.dataServer.data[index].numInCart < prod.quantity ? this.dataServer.data[index].numInCart++ : prod.quantity;
          }

          this.cartData.proddata[index].inCart = this.dataServer.data[index].numInCart;
          localStorage.setItem('cart', JSON.stringify(this.cartData));

          this.toast.info(`${prod.item_name} quantity updated in the cart.`, "Product Updated", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-full-width'
          })
          this.CalculateTotal();
          this.cartData.total = this.dataServer.total;
        } else {
          this.dataServer.data.push({
            numInCart: 1,
            product: prod
          });
          this.cartData.proddata.push({
            inCart: 1,
            id: prod.id
          });
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          this.toast.success(`${prod.item_name} added to the cart.`, "Product Added", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-full-width'
          })
        }
        this.CalculateTotal();
        this.cartData.total = this.dataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartData));
        this.cartInfo$.next({ ...this.dataServer });
      }
    });
  }

  UpdateCartData(index: number, increase: Boolean) {
    let data = this.dataServer.data[index];
    if (increase) {
      // @ts-ignore
      data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
      this.cartData.proddata[index].inCart = data.numInCart;
      this.CalculateTotal();
      this.cartData.total = this.dataServer.total;
      this.cartInfo$.next({ ...this.dataServer });
      localStorage.setItem('cart', JSON.stringify(this.cartData));
    } else {
      // @ts-ignore
      data.numInCart--;
    }

    if (data.numInCart < 1) {
      this.DeleteProductFromCart(index);
      this.cartInfo$.next({ ...this.dataServer });
    } else {
      // @ts-ignore
      this.cartInfo$.next({ ...this.dataServer });
      this.cartData.proddata[index].inCart = data.numInCart;
      this.CalculateTotal();
      this.cartData.total = this.dataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartData));
    }
  }

  DeleteProductFromCart(index) {
    if (window.confirm('Are you sure you want to delete the item from cart?')) {
      this.dataServer.data.splice(index, 1);
      this.cartData.proddata.splice(index, 1);
      this.CalculateTotal();
      this.cartData.total = this.dataServer.total;

      if (this.cartData.total === 0) {
        this.cartData = { proddata: [{ inCart: 0, id: 0 }], total: 0 };
        localStorage.setItem('cart', JSON.stringify(this.cartData));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartData));
      }

      if (this.dataServer.total === 0) {
        this.dataServer = {
          data: [{
            product: undefined,
            numInCart: 0
          }],
          total: 0
        };
        this.cartInfo$.next({ ...this.dataServer });
      } else {
        this.cartInfo$.next({ ...this.dataServer });
      }
    } else {
      return;
    }
  }

  // CheckoutFromCart(userId: Number) {

  //   this.http.post(`${this.baseurl}api/v1/orders/`, null).subscribe((res: { success: Boolean }) => {
  //     console.clear();

  //     if (res.success) {


  //       this.resetServerData();
  //       this.http.post(`${this.baseurl}api/v1/orders/`, {
  //         userId: userId,
  //         products: this.cartData.proddata
  //       }).subscribe((data: OrderConfirmationResponse) => {

  //         this.orderService.getSingleOrder(data.order_id).then(prods => {
  //           if (data.success) {
  //             const navigationExtras: NavigationExtras = {
  //               state: {
  //                 message: data.message,
  //                 products: prods,
  //                 orderId: data.order_id,
  //                 total: this.cartData.total
  //               }
  //             };
  //             this.spinner.hide().then();
  //             this.router.navigate(['/thankyou'], navigationExtras).then(p => {
  //               this.cartData = {prodData: [{incart: 0, id: 0}], total: 0};
  //               this.cartTotal$.next(0);
  //               localStorage.setItem('cart', JSON.stringify(this.cartData));
  //             });
  //           }
  //         });

  //       })
  //     } else {
  //       this.spinner.hide().then()
  //       this.router.navigateByUrl('/checkout').then();
  //       this.toast.error(`Sorry, failed to book the order`, "Order Status", {
  //         timeOut: 1500,
  //         progressBar: true,
  //         progressAnimation: 'increasing',
  //         positionClass: 'toast-top-full-width'
  //       })
  //     }
  //   })
  // }

  private CalculateTotal() {
    let Total = 0;

    this.dataServer.data.forEach(p => {
      const { numInCart } = p;
      const { price } = p.product;
      // @ts-ignore
      Total += numInCart * price;
    });
    this.dataServer.total = Total;
    this.cartTotal$.next(this.dataServer.total);
  }

}
