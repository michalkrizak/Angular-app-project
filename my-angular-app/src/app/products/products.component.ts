import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductComponent } from "./product/product.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { HeaderComponent } from '../header/header.component';
import { CartService } from '../services/cart-service';
import { ApiService, IProduct } from '../services/api-service';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { MatIcon } from '@angular/material/icon';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [MatIcon, SideNavComponent, CartService, CommonModule, RouterModule, ProductComponent, LogoutButtonComponent, HeaderComponent, MatProgressSpinnerModule, FormsModule, MatSliderModule],
})
export class ProductsComponent implements OnInit {
  @ViewChild(SideNavComponent) sidenavComponent!: SideNavComponent;
  @Input() products: IProduct[] = [];
  @Input() user: any = null;
  searchResults: IProduct[] = [];
  searchTerm: string = '';
  minPrice: number = 0;
  maxPrice: number = 1000;

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Použití nového API
    this.apiService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });

    this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log('Current user:', user);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  filterProducts(): void {
    let term = this.searchTerm.toLowerCase();
    if (term.length < 2) {
      this.searchResults = [];
    } else {
      this.searchResults = this.products.filter((product) => product.title.toLowerCase().includes(term));
    }
  }

  CheapestProduct(): void {
    this.products.sort((a, b) => a.price - b.price);
  }

  MostExpensive(): void {
    this.products.sort((a, b) => b.price - a.price);
  }

  abc(): void {
    this.products.sort((a, b) => a.title.localeCompare(b.title));
  }

  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  openSidenav() {
    this.sidenavComponent.toggleSidenav();
  }
}
