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
import { filter, map } from 'rxjs/operators';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';  // ✅ Přidat import


@Component({
  selector: 'app-home-page',
  imports: [InfiniteScrollModule, ProductDetailComponent, HeaderComponent, SideNavComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, CommonModule, FormsModule, ProductDetailComponent, MatProgressSpinnerModule, MatSliderModule, MatIcon],
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
  page: number = 0;  // Aktuální stránka
  pageSize: number = 3;  // Počet produktů na stránku
  isLoading: boolean = false;
  hasMoreProducts: boolean = true; 

  ngOnInit(): void {
    // Použití nového API
    /*this.apiService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });*/
    this.loadMoreProducts();
  }

  loadMoreProducts(): void {
    if (this.isLoading || !this.hasMoreProducts) {
      return;  // Pokud už se načítá nebo nejsou další produkty, nic nedělej
    }

    this.isLoading = true;

    this.apiService.getAllProductsPage(this.page, this.pageSize).subscribe({
      next: (data) => {
        if (data.length < this.pageSize) {
          this.hasMoreProducts = false;  // Už nejsou další produkty
        }

        this.products = [...this.products, ...data];  // Přidání nových produktů
        this.page++;  // Zvýšení stránky
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
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