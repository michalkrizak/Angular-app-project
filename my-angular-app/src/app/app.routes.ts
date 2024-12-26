import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SecondPageComponent } from './second-page/second-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Domovská stránka
  { path: 'second-page', component: SecondPageComponent } // Druhá stránka
];
