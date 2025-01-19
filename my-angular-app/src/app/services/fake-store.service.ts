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
  rating: {
    rate: number;
    count: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class FakeStoreService {
  private apiUrl = 'https://fakestoreapi.com';
  private loggedInUser: any = null;

  constructor(private http: HttpClient) {}

  // Metoda pro získání všech produktů
  getAllProducts$(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products`);
  }

  // Metoda pro získání jednoho produktu podle ID
  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  // Metoda pro získání všech uživatelů
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  // Metoda pro přihlášení
  // Přihlášení uživatele
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

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  logout(): void {
    this.loggedInUser = null;
  }
}
