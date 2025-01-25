import { Component, OnInit } from '@angular/core';
import { FakeStoreService, IProduct } from '../services/fake-store.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router';
import { ProductComponent } from "./product/product.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Injectable({
  providedIn: 'root', // Zajišťuje, že služba je dostupná globálně
})

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ProductComponent, MatProgressSpinnerModule],
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private fakeStoreService: FakeStoreService) {}

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
  }
}
