import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  providedIn: 'root',
})
export class AuthService {
  private localStorageKey = 'loggedInUser';
  private userSubject: BehaviorSubject<any>;

  constructor() {
    const storedUser = localStorage.getItem(this.localStorageKey);
    this.userSubject = new BehaviorSubject<IUser>(storedUser ? JSON.parse(storedUser) : null);
  }

  // Přístup k aktuálnímu uživateli jako Observable
  get user$(): Observable<IUser> {
    return this.userSubject.asObservable();
  }

  // Nastavení přihlášeného uživatele a aktualizace BehaviorSubject
  setLoggedInUser(user: IUser): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
    this.userSubject.next(user); // Oznámení o změně
  }

  // Načtení aktuálního uživatele
  getLoggedInUser(): IUser {
    return this.userSubject.value;
  }

  // Odhlášení uživatele
  logout(): void {
    localStorage.removeItem(this.localStorageKey);
    this.userSubject.next(null); // Oznámení o odhlášení
  }
}
