import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private readonly STORAGE_KEY = 'auth_user';
  
  constructor(private http: HttpClient, private router: Router) {
    // Load user from storage on service initialization
    this.loadUserFromStorage();
  }
  
  // Load user from localStorage if available
  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user data', error);
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
  }
  
  // Login method - calls the API and stores the returned user data
  login(username: string, password: string): Observable<User> {
    // According to requirements, we need to send this payload
    const payload = {
      username,
      password,
      expiresInMins: 30
    };
    
    return this.http.post<User>('https://dummyjson.com/auth/login', payload)
      .pipe(
        tap(user => {
          // Store user in local state and localStorage
          this.currentUserSubject.next(user);
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        }),
        catchError(error => {
          // Handle API errors
          return throwError(() => error);
        })
      );
  }
  
  // Logout method - clears user data and redirects to login
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
  
  // Get current user data
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
