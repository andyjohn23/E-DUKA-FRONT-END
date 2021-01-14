import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public categories;

  constructor(private category: CategoryService, private router: Router) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.category.getAllCategory().subscribe(
      data => {
        this.categories = data;
      },
      err => console.error(err),
      () => console.log('done loading categories')
    );
  }
}
