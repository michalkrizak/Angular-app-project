import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearcBarComponent } from '../searc-bar/searc-bar.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { Router } from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import { OnDestroy, inject, signal} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, SearcBarComponent, SideNavComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule ,CommonModule, FormsModule, SearcBarComponent, LogoutButtonComponent ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  @ViewChild(SideNavComponent) sidenavComponent!: SideNavComponent;
  constructor(private router: Router, private media: MediaMatcher) { }

  openSidenav() {
    this.sidenavComponent.toggleSidenav();
  }

  ToCart(): void {
    this.router.navigate(['cart']);
  }
}