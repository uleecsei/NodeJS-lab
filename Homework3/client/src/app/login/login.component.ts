import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { User } from '../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  user: any = {};
  ngOnInit(): void {
  }


  login() {
    this.authService.login(this.user).subscribe(respone => {
      this.router.navigate(['/home'])
    }, error => {
      console.log(error);
      alert(error.message);
    })
  }
}
