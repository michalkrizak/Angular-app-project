import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router, RouterModule } from '@angular/router';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { SearcBarComponent } from '../searc-bar/searc-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  imports: [MatIcon, LogoutButtonComponent, CommonModule, RouterModule, SearcBarComponent, RouterModule], // Import CommonModule
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {} 

  @Input() user: any = null;
  @Input() products: any = null;
  isCategoryMenuOpen: boolean = false;
  ngOnInit() {
    console.log('User:', this.user);
    console.log('Products:', this.products);
  }

  toggleCategoryMenu(): void {
    this.isCategoryMenuOpen = !this.isCategoryMenuOpen;
  }

  selectCategory(category: string): void {
    console.log('Selected category:', category);
    this.isCategoryMenuOpen = false; // Zavře menu po výběru
  }

  ToCart(): void {
    //this.router.navigate(['../cart']);
    this.dialog.open(CartComponent, {
      width: '95%', // Use viewport width units instead of pixels
      maxWidth: '110%', // Override default max width
      height: '95%',
      maxHeight: '110%'
    });
  }

  logout(): void {
    this.authService.logout(); // Odhlášení uživatele
    this.router.navigate(['']); // Přesměrování na přihlašovací stránku
  }
}
