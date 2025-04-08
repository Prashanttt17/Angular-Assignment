// import { Injectable } from '@angular/core';
// import { 
//   CanActivate, 
//   Router, 
//   ActivatedRouteSnapshot, 
//   RouterStateSnapshot 
// } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
  
//   constructor(private authService: AuthService, private router: Router) {}
  
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     // Check if the user is authenticated
//     if (this.authService.isAuthenticated()) {
//       // If trying to access login page while authenticated, redirect to home
//       if (state.url === '/login') {
//         this.router.navigate(['/home']);
//         return false;
//       }
//       // Otherwise allow access to protected routes
//       return true;
//     } else {
//       // If not authenticated and trying to access protected route, redirect to login
//       if (state.url !== '/login') {
//         this.router.navigate(['/login']);
//         return false;
//       }
//       // Allow access to login page
//       return true;
//     }
//   }
// }
































import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot 
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn = this.authService.isAuthenticated();

    if (isLoggedIn) {
      // If user is logged in and trying to go to login page, redirect to home
      if (state.url === '/login') {
        this.router.navigate(['/home']);
        return false;
      }
      return true; // Allow access to other routes
    } else {
      // If user is not logged in and trying to go anywhere except login, redirect to login
      if (state.url !== '/login') {
        this.router.navigate(['/login']);
        return false;
      }
      return true; // Allow access to login
    }
  }
}
