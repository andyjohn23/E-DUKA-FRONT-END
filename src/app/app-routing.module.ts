import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SignupComponent } from './components/signup/signup.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: CustomerProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'category/:id',
    component: CategoryProductsComponent
  },
  {
    path: 'sub-category/:id',
    component: SubCategoryComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
