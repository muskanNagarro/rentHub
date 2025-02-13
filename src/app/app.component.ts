import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Apartment Rental App';

  constructor(private router: Router) {}

  // Check if a user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;  // Assumes a logged-in user is stored in 'currentUser' in localStorage
  }

  // Logout functionality
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);  // Navigate to login page after logging out
  }
}
