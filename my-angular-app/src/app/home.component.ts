
import { Component } from '@angular/core';
import { FakeStoreService } from './services/fake-store.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ChangeDetectionStrategy, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthService, IUser } from './services/auth.service';
import { ApiService } from './services/api-service';


@Component({
  selector: 'app-root',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  standalone: true, // Potvrď, že komponenta je standalone
  changeDetection: ChangeDetectionStrategy.OnPush,

})


export class HomeComponent {

  username : string = '';
  password : string = '';
  loggedInUser: any = null;
  errorMessage = '';

  constructor(
    private router: Router, 
    private fakeStoreService: FakeStoreService,
    private apiService: ApiService,  // Pokud chceš použít API, vytvoř nový service a přidej ho do importsu
    private authService: AuthService
  ) {}

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.preventDefault();
    event.stopPropagation();
  }

  ngOnInit(): void {
   // this.loggedInUser = this.fakeStoreService.getLoggedInUser();
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  login(): void {
    this.apiService.login(this.username, this.password).subscribe((success: any) => {
      if (success) {
        const user = this.apiService.getLoggedInUser();
        this.authService.setLoggedInUser(user); // Uložení uživatele do localStorage
        console.warn('Přihlášení:', user);
        this.loggedInUser = user; // Nastavení lokální proměnné
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Nesprávné přihlašovací údaje';
      }
    });
  }

  logout(): void {
    console.warn('Odhlášení:');
    this.authService.logout(); // Smazání uživatele z localStorage
    this.loggedInUser = null;
  }

  navigateToHomePage(): void {
    this.router.navigate(['/home-page']);
  }
}