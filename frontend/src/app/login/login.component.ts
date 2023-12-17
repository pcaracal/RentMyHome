import {Component} from '@angular/core';
import {ApiService} from "../api.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  usernameInvalid: boolean = false;
  passwordInvalid: boolean = false;

  constructor(private apiService: ApiService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.usernameInvalid = true;
    this.passwordInvalid = true;
  }

  usernameChange() {
    this.usernameInvalid = this.username.length < 3;
  }

  passwordChange() {
    this.passwordInvalid = this.password.length < 3;
  }

  submitLogin() {
    if (this.usernameInvalid || this.passwordInvalid) {
      return;
    }
    this.apiService.postLogin(this.username, this.password).pipe().subscribe(
      (data: any) => {
        this.apiService.bearerToken = data;
        this.toastr.success('Login successful', 'Success');
        window.history.back();
      },
      (error: any) => {
        this.apiService.bearerToken = '';

        switch (error.status) {
          case 404:
            this.toastr.error('Invalid username or password', 'Unauthorized');
            break;
          default:
            this.toastr.error('Login failed', 'Internal Server Error');
            break;
        }
      }
    )
  }

  submitRegister() {
    if (this.usernameInvalid || this.passwordInvalid) {
      return;
    }
    this.apiService.postRegister(this.username, this.password).pipe().subscribe(
      (data: any) => {
        this.toastr.success('Registration successful', 'Success');
        this.apiService.bearerToken = data;
        window.history.back();
      },
      (error: any) => {
        switch (error.status) {
          case 409:
            this.toastr.error('Username already exists', 'Conflict');
            break;
          default:
            this.toastr.error('Registration failed', 'Internal Server Error');
            break;
        }
      }
    )
  }
}