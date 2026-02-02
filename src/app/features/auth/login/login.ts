import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  host: {
    class: 'flex flex-1 w-full',
  },
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  submit() {
    const success = this.auth.login(this.email, this.password);

    if (!success) {
      this.error = 'Invalid credentials';
      return;
    }

    this.router.navigate(['/']);
  }
}
