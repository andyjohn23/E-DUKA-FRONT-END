import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registration;
  
  constructor(private RegistrationService: RegistrationService,
    private router: Router) { }

  ngOnInit() {
    this.registration = {
      store_name: "",
      description: "",
      address: "",
      city: "",
      country: "",
      phone_no: "",
    }
  }

  registerUser() {
    this.RegistrationService.AddUser(this.registration).subscribe(
      response => {
        alert('user ' + this.registration.store_name + ' has been created')
        this.router.navigate(['/shops'])
      },
      error => console.log('error', error)
    )
  }

}
