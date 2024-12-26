import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h1>Vítej v mé první Angular aplikaci!</h1>
    <p>Angular je super!</p>
    <div class="container1">
      <button class="navigate-button" routerLink="/second-page" routerLinkActive="active">
        Přesun na druhou stránku
      </button>
    </div>
  `,

  standalone: true
})
export class HomeComponent {}
