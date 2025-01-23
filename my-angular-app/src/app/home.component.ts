
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

  constructor(private router: Router, private fakeStoreService: FakeStoreService) {}

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

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
