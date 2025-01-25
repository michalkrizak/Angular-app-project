
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
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [RouterOutlet, CommonModule, FormsModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
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
    this.fakeStoreService.login(this.username, this.password).subscribe((success: any) => {
      if (success) {
        const user = this.fakeStoreService.getLoggedInUser();
        this.authService.setLoggedInUser(user); // Uložení uživatele do localStorage
        this.loggedInUser = user; // Nastavení lokální proměnné
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Nesprávné přihlašovací údaje';
      }
    });
  }

  logout(): void {
    this.authService.logout(); // Smazání uživatele z localStorage
    this.loggedInUser = null;
  }

  navigateToProduct(): void {
    this.router.navigate(['/products']);
  }
}