import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MOCK_USERS } from './mock-users';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<{ email: string; name: string } | null>(null);

  user = this._user.asReadonly();
  isAuthenticated = () => this._user() !== null;

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this._user.set(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): boolean {
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) return false;

    const userData = { email: foundUser.email, name: foundUser.name };
    this._user.set(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    return true;
  }

  logout() {
    this._user.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}