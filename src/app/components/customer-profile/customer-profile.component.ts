import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  user;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(profile => {
      this.user = profile.user;
    })

  }

}
