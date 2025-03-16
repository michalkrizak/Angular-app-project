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

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  }
  phone: string;
  __v: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Odkaz na tvé API
  private loggedInUser: any = null;

  constructor(private http: HttpClient) {}

  // Načtení všech produktů
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  // Načtení jednoho produktu podle ID
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/products/${id}`);
  }

  // Přidání nového produktu
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrl}/products`, product);
  }

  // Úprava produktu
  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apiUrl}/products/${product.id}`, product);
  }

  // Smazání produktu
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }

  getUserCartItems(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/carts/user/${userId}`);
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.getAllUsers().subscribe((users) => {
        const user = users.find((u) => u.username === username && u.password === password || u.email === username && u.password === password);
        if (user) {
          this.loggedInUser = user;
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  getLoggedInUser(): IUser {
    return this.loggedInUser;
  }

  logout(): void {
    this.loggedInUser = null;
  }

  getAllProductsPage(page: number, pageSize: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products?page=${page}&pageSize=${pageSize}`);
  }
}
