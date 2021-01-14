import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { SubCategory } from 'src/app/models/sub-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  category: Category;

  constructor(private router: Router, private route: ActivatedRoute, private products: ProductService) { 
    route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this.products.getSubcategoryProducts(+params.get('id'))
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
