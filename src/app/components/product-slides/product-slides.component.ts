import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-slides',
  templateUrl: './product-slides.component.html',
  styleUrls: ['./product-slides.component.css']
})
export class ProductSlidesComponent implements OnInit {

  public products;
  public categories;

  constructor(private category: CategoryService) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.category.getAllProducts().subscribe(
      data => {
        this.products = data;
        console.log(data);

      },
      err => console.error(err),
      () => console.log('done loading products')
    );
  }

  getCategories() {
    this.category.getAllCategory().subscribe(
      data => {
        this.categories = data;
        console.log(data);

      },
      err => console.error(err),
      () => console.log('done loading categories')
    );
  }
}
