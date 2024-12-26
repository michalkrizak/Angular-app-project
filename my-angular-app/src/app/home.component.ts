
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [RouterOutlet], // Import RouterOutlet sem
  standalone: true, // Potvrď, že komponenta je standalone
})

export class HomeComponent {

  title = 'my-angular-app';

  constructor(private router: Router) {}

  navigateToSecondPage() {
    this.router.navigate(['/second-page']);
  }
}
