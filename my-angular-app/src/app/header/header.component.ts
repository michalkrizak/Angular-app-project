import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { SearcBarComponent } from '../searc-bar/searc-bar.component';


@Component({
  selector: 'app-header',
  imports: [LogoutButtonComponent, CommonModule, RouterModule, SearcBarComponent], // Import CommonModule
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() user: any = null;
  @Input() products: any = null;

  ngOnInit() {
    console.log('User:', this.user);
    console.log('Products:', this.products);
  }
}
