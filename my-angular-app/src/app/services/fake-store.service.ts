import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FakeStoreService {
  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  // Metoda pro získání všech produktů
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  // Metoda pro získání jednoho produktu podle ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`);
  }

  // Metoda pro získání všech uživatelů
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  // Metoda pro přihlášení
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, body);
  }
}
