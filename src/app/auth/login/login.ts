import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  @Output() showRegister = new EventEmitter();

  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.login();
  }

  get f() {
    return this.loginForm.controls;
  }

  login(): void {
    this.auth.login({ username: this.f.username.value, password: this.f.password.value }).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.errorMessage = err.message;
      }
    });
  }
}
