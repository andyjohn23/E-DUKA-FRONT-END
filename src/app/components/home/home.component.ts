import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public categories;

  constructor(private category: CategoryService) { }

  ngOnInit() {
    this.getCategories();
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
