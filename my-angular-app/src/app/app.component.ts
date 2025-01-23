
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, RouterModule, MatButtonModule,MatProgressSpinnerModule, MatFormFieldModule ], // Import RouterOutlet sem
  standalone: true, // Potvrď, že komponenta je standalone
})

export class AppComponent {

  title = 'my-angular-app';



  constructor(private router: Router) {}

  navigateToSecondPage() {

    this.router.navigate(['/second-page']);

  }

}
