import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorageKey = 'loggedInUser';
  private userSubject: BehaviorSubject<any>;

  constructor() {
    const storedUser = localStorage.getItem(this.localStorageKey);
    this.userSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
  }

  // Přístup k aktuálnímu uživateli jako Observable
  get user$(): Observable<any> {
    return this.userSubject.asObservable();
  }

  // Nastavení přihlášeného uživatele a aktualizace BehaviorSubject
  setLoggedInUser(user: any): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
    this.userSubject.next(user); // Oznámení o změně
  }

  // Načtení aktuálního uživatele
  getLoggedInUser(): any {
    return this.userSubject.value;
  }

  // Odhlášení uživatele
  logout(): void {
    localStorage.removeItem(this.localStorageKey);
    this.userSubject.next(null); // Oznámení o odhlášení
  }
}
