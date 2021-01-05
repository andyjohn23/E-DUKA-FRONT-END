import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  input;

  constructor( private userService: AuthService, 
    private router:Router ) { }

  ngOnInit(): void {
    this.input={
      'email':'',
      'password':'',
    }
  }

  onLogin() {
    this.userService.login(this.input).subscribe((res: Response) => {
      console.log(res)
      localStorage.setItem('loggedIn', res['token'])
      this.router.navigate(['/'])
    }, error => {
      console.log('error');
      this.router.navigate(['/signup']);
    })
  }
}
