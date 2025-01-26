import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('Kontrola přístupu:'); // Debug
    if (this.authService.getLoggedInUser() !== null) {
      return true;
    }
    console.warn('Uživatel není přihlášen, přesměrování na přihlašovací stránku.');
    this.router.navigate(['']); // Přesměrování na přihlašovací stránku
    return false;
  }
}
