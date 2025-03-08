import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/products'; // Odkaz na tvé API

  constructor(private http: HttpClient) {}

  // Načtení všech produktů
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  // Načtení jednoho produktu podle ID
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  // Přidání nového produktu
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl, product);
  }

  // Úprava produktu
  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apiUrl}/${product.id}`, product);
  }

  // Smazání produktu
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
