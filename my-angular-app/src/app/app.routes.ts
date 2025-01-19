import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component'; // Importuj ProductsComponent
import { ProductDetailComponent } from './products/product-detail/product-detail.component';



export const routes: Routes = [
  { path: '', component: HomeComponent }, // Domovská stránka
  { path: 'second-page', component: SecondPageComponent }, // Druhá stránka
  { path: 'products', component: ProductsComponent } ,
  { path: 'product/:id', component: ProductDetailComponent }, // Detail produktu
  { path: '**', component: HomeComponent },
];