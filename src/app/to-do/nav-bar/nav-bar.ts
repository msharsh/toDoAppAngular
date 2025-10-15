import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  username: string = '';

  ngOnInit(): void {
    this.username = this.auth.getUsername() ?? '';
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }
}
