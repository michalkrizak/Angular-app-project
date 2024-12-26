import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet], // Import RouterOutlet sem
  standalone: true, // Potvrď, že komponenta je standalone
})
export class AppComponent {
  title = 'my-angular-app';
}

