import { Component, OnInit } from '@angular/core';
import { FakeStoreService, IProduct } from '../services/fake-store.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router';
import { ProductComponent } from "./product/product.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { FormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root', // Zajišťuje, že služba je dostupná globálně
})

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ProductComponent, LogoutButtonComponent, MatProgressSpinnerModule, FormsModule],
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  user: any = null;
  searchResults: IProduct[] = []; // Výsledky pro autocomplete
  searchTerm: string = '';

  constructor(private fakeStoreService: FakeStoreService
    , private authService: AuthService
    , private router: Router
  ) {}

  ngOnInit(): void {

    // Načtení všech produktů při inicializaci komponenty
    this.fakeStoreService.getAllProducts$().subscribe({
      next: (data) => {
        //console.log(data[0].); // Debug: Zobrazení dat v konzoli
        this.products = data;
        console.log(data); // Debug: Zobrazení dat v konzoli
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });

    this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log('Current user:', user); // Debug
    });
  
}

  logout(): void {
    this.authService.logout(); // Smazání uživatele z localStorage
    this.router.navigate(['']);
  }

  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.searchResults = this.products.filter((product) =>
      product.title.toLowerCase().includes(term)
    );
  }

  // Přesměrování na detail produktu
  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}