import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Command } from 'protractor';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-slides',
  templateUrl: './product-slides.component.html',
  styleUrls: ['./product-slides.component.css']
})
export class ProductSlidesComponent implements OnInit {

  public products;
  public categories;

  constructor(private category: CategoryService, private product:ProductService, private router:Router) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.product.getAllProducts().subscribe(
      data => {
        this.products = data;
        // console.log(data);
      },
      err => console.error(err),
      () => console.log('done loading products')
    );
  }

  getCategories() {
    this.category.getAllCategory().subscribe(
      data => {
        this.categories = data;
        // console.log(data);
      },
      err => console.error(err),
      () => console.log('done loading categories')
    );
  }

  selectedProduct(id: Number){
    this.router.navigate(['/product', id]).then();
  }
}
