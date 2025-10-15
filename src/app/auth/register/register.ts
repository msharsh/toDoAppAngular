import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  @Output() showLogin = new EventEmitter();

  constructor(private auth: AuthService) {}

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [Validators.required]),
  }, {validators: this.passwordMatchValidator} );

  register(): void {
    this.auth.register(this.f.username.value!, this.f.password.value!).subscribe({
      next: () => {
        alert("Registered successfully!");
        this.showLogin.emit();
      },
      error: (err) => console.log(err)
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  submitForm(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.register();
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
