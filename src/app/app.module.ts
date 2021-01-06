import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductSlidesComponent } from './components/product-slides/product-slides.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from './services/auth.service';
import { UsermanagerService } from './services/usermanager.service';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { AuthGuardService } from './services/auth-guard.service';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductSlidesComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    AlertComponent,
    CustomerProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://shitandi-duka.herokuapp.com/"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [AuthService, UsermanagerService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
