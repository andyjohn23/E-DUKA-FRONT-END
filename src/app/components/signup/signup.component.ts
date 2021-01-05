import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup;

  constructor(private UserService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.signup = {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    }
  }

  signupUser() {
    this.UserService.AddUser(this.signup).subscribe(
      response => {
        alert('user ' + this.signup.first_name + ' has been created')
        this.router.navigate(['/login'])
      },
      error => console.log('error', error)
    )
  }
}
