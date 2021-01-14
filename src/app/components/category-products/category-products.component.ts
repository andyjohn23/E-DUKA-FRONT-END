import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { productModel } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  category: Category;

  constructor(private router: Router, private route: ActivatedRoute, private products: ProductService) { 
    route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this.products.getCategorySubs(+params.get('id'))
          .subscribe(res => {
            this.category = res;
          })
      } else {
        router.navigate(['/']);
      }
    })
  }

  ngOnInit(): void {

  }

  selectedProduct(id: Number){
    this.router.navigate(['/product', id]).then();
  }

}
