import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  item_name;
  image;
  price;
  description;

  constructor(private products:ProductService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.paramMap
    // .pipe(
    //   map((param:ParamMap) => {
    //      return this.route.snapshot.params['id'];
    //   })
    // )
    // .subscribe(prodId => {
    //   this.id = prodId;
    //   this.products.getProduct(this.id).subscribe
    // });
  }

}
