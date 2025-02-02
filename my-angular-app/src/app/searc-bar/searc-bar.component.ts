import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FakeStoreService, IProduct } from '../services/fake-store.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { HeaderComponent } from '../header/header.component';
import { ProductComponent } from '../products/product/product.component';

@Injectable({
  providedIn: 'root', // Zajišťuje, že služba je dostupná globálně
})

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, RouterModule, ProductComponent, LogoutButtonComponent, HeaderComponent, MatProgressSpinnerModule, FormsModule, MatSliderModule], // Import CommonModule
  templateUrl: './searc-bar.component.html',
  styleUrl: './searc-bar.component.scss'
})


export class SearcBarComponent implements OnInit {
  products: IProduct[] = [];
  searchResults: IProduct[] = []; // Výsledky pro autocomplete
  searchTerm: string = '';
  user: any = null;

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

filterProducts(): void {
  var term = this.searchTerm.toLowerCase();
  if (term.length < 2) {
    this.searchResults = [];
    }
    else{
      this.searchResults = this.products.filter((product) =>
      product.title.toLowerCase().includes(term)
  );
}
}

// Přesměrování na detail produktu
goToProductDetail(productId: number): void {
  this.router.navigate(['/product', productId]);
}
}
