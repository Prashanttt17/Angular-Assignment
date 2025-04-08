import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  
  constructor(private authService: AuthService, private route: Router) {}
  
  ngOnInit(): void {
    // Get current user data
    this.currentUser = this.authService.getCurrentUser();
  }
  
  // Logout handler
  logout(): void {
    this.authService.logout();
  }

  redirect(){
    this.route.navigate(['/new']);
  }
}
