import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearcBarComponent } from '../searc-bar/searc-bar.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { Router } from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import { OnDestroy, inject, signal} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { HeaderComponent } from '../header/header.component';
import { ProductComponent } from '../products/product/product.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Input, OnInit,  } from '@angular/core';
import { Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';
import { MatSliderModule } from '@angular/material/slider';
import { CartService } from '../services/cart-service';
import { ApiService, IProduct } from '../services/api-service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home-page',
  imports: [ProductDetailComponent, HeaderComponent, SearcBarComponent, SideNavComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, CommonModule, FormsModule, SearcBarComponent, LogoutButtonComponent, ProductDetailComponent, ProductComponent, MatProgressSpinnerModule, MatSliderModule, MatIcon],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  @ViewChild(SideNavComponent) sidenavComponent!: SideNavComponent;
  constructor(private router: Router, private media: MediaMatcher,
    private apiService: ApiService,
    private authService: AuthService,
  ) { }

  products: IProduct[] = [];
  user: any = null;

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


  openSidenav() {
    this.sidenavComponent.toggleSidenav();
  }

  ToCart(): void {
    this.router.navigate(['cart']);
  }

  ToShop(): void {
    this.router.navigate(['products']);
  }
}