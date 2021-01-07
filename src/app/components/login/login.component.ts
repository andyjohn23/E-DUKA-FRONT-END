import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsermanagerService } from 'src/app/services/usermanager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor( 
    private userService: UsermanagerService, 
    private router:Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }

    // console.log('submitted value', this.loginForm.value);

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.loading = true;
    this.userService.authenticate(email, password).subscribe(
      result => {
        localStorage.setItem('token', result['access']);
        localStorage.setItem('refresh', result['refresh']);
        this.router.navigate(['/dashboard']);
      },

      error => {
        console.log('error');
      }
    );
  }

}
