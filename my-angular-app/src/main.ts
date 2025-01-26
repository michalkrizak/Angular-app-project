import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Nastavení routeru
    provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync()    // Nastavení HttpClientModule
  ]
}).catch(err => console.error(err));