import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToasterService } from '../../shared/toaster/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  showPassword = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toaster: ToasterService
  ) {}
  
  ngOnInit(): void {
    // Initialize login form with validators
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    
    // Check if already logged in - redirect to home if so
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }
  
  // Form getter for easier access in template
  get f() { 
    return this.loginForm.controls; 
  }
  
  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  onSubmit(): void {
    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      // Mark all fields as touched to trigger validation visual feedback
      Object.keys(this.f).forEach(key => {
        const control = this.f[key];
        control.markAsTouched();
      });
      return;
    }
    
    this.isSubmitting = true;
    
    // Get form values
    const { username, password } = this.loginForm.value;
    
    // Call auth service to login
    this.authService.login(username, password).subscribe({
      next: () => {
        // On successful login
        this.toaster.success('Login successful!');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // Handle login errors
        console.error('Login error:', error);
        this.toaster.error(error?.error?.message || 'Invalid username or password');
        this.isSubmitting = false;
      }
    });
  }
}

