import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  IsLoggedIn: boolean = false;
  LoginAttempted: boolean = false;

  constructor(public formBuilder: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("IsLoggedIn") === "True"){
      window.location.href = "products";
    }
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    this.IsLoggedIn = this.userService.login(this.loginForm.get('userName')?.value, this.loginForm.get('password')?.value);
    if(this.IsLoggedIn) {
      localStorage.setItem("UserName", this.loginForm.get('userName')?.value);
      localStorage.setItem("IsLoggedIn", "True");
      window.location.href = "products";
    }
    else {
      localStorage.setItem("UserName", this.loginForm.get('userName')?.value);
      localStorage.setItem("IsLoggedIn", "False");
    }
    this.LoginAttempted = true;
  }

  logout() {

  }
}
