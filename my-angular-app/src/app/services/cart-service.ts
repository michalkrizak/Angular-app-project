

import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { FakeStoreService } from './fake-store.service';
import { CartComponent, ICartItemWithQuantity } from '../cart/cart.component';
import { IProduct, ICartItem } from './fake-store.service';
import { BehaviorSubject, from, map, mergeMap, Observable, Subject, takeUntil, tap, toArray } from 'rxjs';

@NgModule({
  imports: [CommonModule],
})
export class CartService implements OnInit {

  user: any;
  //cartItems: any[] = [];
  loggedInUser: any = null;
  product: IProduct[] = [];
  //products: ICartItemWithQuantity[] = [];
  cartProducts: ICartItemWithQuantity[] = [];
  products: IProduct[] = [];
  cartItems: ICartItem[] = [];
  in : number = 0;
  deliveryPrice: number = 10;
  destroy$ = new Subject<void>();
  private cartItems$ = new BehaviorSubject<any[]>([]);


  private isProductLoaded: boolean = false; // Funkce pro kontrolu, zda jsou produkty nacteny boolean => {
  
  

  constructor(private fakeStoreService: FakeStoreService, 
    private authService: AuthService) {}
  ngOnInit(): void {
    this.loadAllProducts();
  }


  loadAllProducts(): void {
    if(this.isProductLoaded) {
      return;
    }
    this.loggedInUser = this.authService.getLoggedInUser();
    console.log('loggedInUser', this.loggedInUser);

    this.fakeStoreService.getUserCartItems(this.loggedInUser.id).pipe(
        takeUntil(this.destroy$),
        //tap(items => this.cartItems = items), // Uložení košíku	
        mergeMap((items: ICartItem[]) => from(items)),
        mergeMap((item: ICartItem) => from(item.products)),
        mergeMap((product: any) => this.fakeStoreService.getProductById(product.productId).pipe(
          map(prod => ({
            product: prod,
            quantity: product.quantity
          }))
        )),
        toArray()
    ).subscribe(cart  => {
        //this.cartProducts = cart;
        this.cartItems$.next(cart);
        this.isProductLoaded = true;
      });
    }

    public getCartItems$(): Observable<any | undefined> {
        return this.cartItems$
      }
    
   /* loadProduct(index: number, productId: number, quantity: number): void {
      this.fakeStoreService.getProductById(productId).subscribe((product) => {
        console.log('Loaded product:', product);
  
        this.products[index] = product;
  
        this.cartProducts.push({
          product: product,
          quantity: quantity,
        });
  
      });


  }*/

}

/*destroy$ = new Subject<void>();
ngOnInit(): void {
  this.loadAllProducts();
}

loadAllProducts(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    console.log('loggedInUser', this.loggedInUser);

    this.fakeStoreService.getUserCartItems(this.loggedInUser.id)
      .pipe(
        tap(items => this.cartItems = items), // Uložení košíku
        mergeMap(items => 
          from(items).pipe(
            mergeMap(cartItem => 
              from(cartItem.products).pipe(
                mergeMap(product =>
                  this.fakeStoreService.getProductById(product.productId).pipe(
                    map(prod => ({
                      product: prod,
                      quantity: product.quantity
                    }))
                  )
                )
              )
            ),
            toArray() // Posbíráme všechny produkty do pole
          )
        ),
        takeUntil(this.destroy$) // Ukončíme při zničení komponenty
      )
      .subscribe(products => {
        this.cartProducts = products;
        console.log('Loaded products:', this.cartProducts);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }*/

