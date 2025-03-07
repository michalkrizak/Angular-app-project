import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FakeStoreService, ICartItem, IProduct } from '../services/fake-store.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartService } from '../services/cart-service';
import { concatMap, forkJoin, from, map, mergeMap, reduce, tap, toArray } from 'rxjs';

export interface ICartItemWithQuantity{
    product: IProduct;
    quantity: number;
  }

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [CartService]
})


export class CartComponent implements OnInit {
  user: any;
  //cartItems: any[] = [];
  loggedInUser: any = null;
  product: IProduct[] = [];
  //products: ICartItemWithQuantity[] = [];
  cartProducts: ICartItemWithQuantity[] = [];
  products: IProduct[] = [];
  cartItems: ICartItem[] = [];

  deliveryPrice: number = 10;

  
  

  constructor(public dialogRef: MatDialogRef<CartComponent>, 
    private fakeStoreService: FakeStoreService, 
    private authService: AuthService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
   // this.cartService.getCartItems$();
   /* this.loggedInUser = this.authService.getLoggedInUser();
    console.log('loggedInUser', this.loggedInUser);
  
    this.fakeStoreService.getUserCartItems(this.loggedInUser.id).subscribe((items) => {
      //console.log('items', items);
      this.cartItems = items;
      console.log('Number of items:', this.cartItems.length);
      console.log('items', this.cartItems);
      this.cartItems.forEach(item => {
        console.log('itemos', item);
      });
      // Načtení produktů pro každou položku v košíku
      
      for (let i = 0; i < this.cartItems.length; i++) {
        for (let j = 0; j < this.cartItems[i].products.length; j++) {
          //this.products[this.in].quantity = this.cartItems[i].products[j].quantity;
          this.loadProduct(this.in, this.cartItems[i].products[j].productId, this.cartItems[i].products[j].quantity);
          //this.products[this.in].quantity = this.cartItems[i].products[j].quantity;
          this.in++;
        }
      }
    });*/
    this.loadAllProducts1();
  }
  
  loadAllProducts(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    console.log('loggedInUser', this.loggedInUser);

    this.fakeStoreService.getUserCartItems(this.loggedInUser.id).pipe(
        tap(items => this.cartItems = items),
        mergeMap((items: any[]) => from(items)),
        mergeMap((item: any) => from(item.products)),
        mergeMap((product: any) => this.fakeStoreService.getProductById(product.productId).pipe(
          map(prod => ({
            product: prod,
            quantity: product.quantity
          }))
        )),
        toArray()
    ).subscribe(cart  => {
      console.log('cart', cart);
        this.cartProducts = cart;
      });
    }

    loadAllProducts1(): void {
      this.loggedInUser = this.authService.getLoggedInUser();
      console.log('loggedInUser', this.loggedInUser);
  
      this.fakeStoreService.getUserCartItems(this.loggedInUser.id).pipe(
          tap(items => this.cartItems = items), // Uložení košíku
          //tap(products => console.log('Extracted products:', products)),
          //map(items => items.map(item => item.products).flat()),
          map(items => { return [].concat(...items.map(item => item.products)) }),
          concatMap(products => from(products)), 
          mergeMap((product: any) => {
            return this.fakeStoreService.getProductById(product.productId).pipe(
              map(prod => ({
                product: prod,
                quantity: product.quantity
              }))
            );
        }),
       toArray()
   
      ).subscribe(cart => {
        console.log('cart', cart);
        this.cartProducts = cart;
      });
  }

  loadProduct(index: number, productId: number, quantity: number): void {
    this.fakeStoreService.getProductById(productId).subscribe((product) => {
      console.log('Loaded product:', product);
      /* if (!this.products) {
        this.products = [];
      } */
      //this.products[index].product = product;
      this.products[index] = product;

      this.cartProducts.push({
        product: product,
        quantity: quantity,
      });
      //this.cartProducts[index].quantity = quantity;
      //this.cartProducts[index].product = product;
    });
  }



  close(): void {
    this.dialogRef.close();
  }


  increaseQuantity(item: ICartItemWithQuantity): void {
    item.quantity++;
  }

  decreaseQuantity(item: ICartItemWithQuantity): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  totalPrice(): number {
    const totalPrice = this.cartProducts.reduce((total, item) => total + item.product.price * item.quantity, 0);
    return totalPrice + this.deliveryPrice;
  }

  removeItem(item: ICartItemWithQuantity): void {
    this.cartProducts = this.cartProducts.filter(i => i !== item);
  }

  updateDeliveryPrice(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.deliveryPrice = Number(selectElement.value);
}


}
