import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

interface JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
  exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5187/Auth';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }

  register(username: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, {
      id: 0,
      username: username,
      password: password
    });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }

  getUsername(): string | null {
    const decoded = this.getDecodedToken();
    return decoded
      ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ?? null
      : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
