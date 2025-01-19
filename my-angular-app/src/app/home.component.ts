
import { Component } from '@angular/core';
import { FakeStoreService } from './services/fake-store.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [RouterOutlet, CommonModule, FormsModule],
  standalone: true, // Potvrď, že komponenta je standalone
})

export class HomeComponent {

  title = 'my-angular-app';
  username = '';
  password = '';
  loggedInUser: any = null;
  errorMessage = '';

  constructor(private router: Router, private fakeStoreService: FakeStoreService) {}

  ngOnInit(): void {
    this.loggedInUser = this.fakeStoreService.getLoggedInUser();
  }

  login(): void {
    this.fakeStoreService.login(this.username, this.password).subscribe((success: any) => {
      if (success) {
        this.loggedInUser = this.fakeStoreService.getLoggedInUser();
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Nesprávné přihlašovací údaje';
      }
    });
  }

  logout(): void {
    this.fakeStoreService.logout();
    this.loggedInUser = null;
  }

  navigateToSecondPage() {
    this.router.navigate(['/second-page']);
  }

  navigateToProduct() {
    this.router.navigate(['/products']);
  }
}
