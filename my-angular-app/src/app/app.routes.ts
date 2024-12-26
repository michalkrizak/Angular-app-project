import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent }, // Domovská stránka
  { path: 'second-page', component: SecondPageComponent } // Druhá stránka
];