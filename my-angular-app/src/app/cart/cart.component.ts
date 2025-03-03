import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FakeStoreService,
  IProduct,
} from '../services/fake-store.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart-service';
import {
  BehaviorSubject,
  concatMap,
  firstValueFrom,
  from,
  map,
  mergeMap,
  toArray,
} from 'rxjs';


export enum eItemOperations{
  ADD = 'add',
  REMOVE = 'remove',
  ALTER = 'alter'
}
export interface ICartItemWithQuantity {
  product: IProduct;
  quantity: number;
}

export interface ICart {
  id: number;
  products: ICartItemWithQuantity[];
  deliveryPrice: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [CartService],
})
export class CartComponent implements OnInit {
  private loggedInUser: any = null;
  private _cart = new BehaviorSubject<ICart>({
    id: 1,
    products: [],
    deliveryPrice: 0,
  });

  public finalPrice$ = this._cart.pipe(
    map((cart) => (cart && cart.id !== null ? this.calcFinalPrice(cart) : 0))
  );
  public cart$ = this._cart.asObservable();
  public IOPS = eItemOperations

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    private fakeStoreService: FakeStoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  private loadAllProducts(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    this.fakeStoreService
      .getUserCartItems(this.loggedInUser.id)
      .pipe(
        map((items) => {
          return [].concat(...items.map((item) => item.products));
        }),
        concatMap((products) => from(products)),
        mergeMap((product: any) => {
          return this.fakeStoreService.getProductById(product.productId).pipe(
            map((prod) => ({
              product: prod,
              quantity: product.quantity,
            }))
          );
        }),
        toArray()
      )
      .subscribe((cart) => {
        this.setCartProducts(cart)
      });
  }

  private async setCartProducts(products: ICartItemWithQuantity[]){
    try {
      const cart = await firstValueFrom(this.cart$);
      cart.products = products;
      this._cart.next(cart);
    } catch (error) {
      console.log('Error updating products');
    }
  }

  private calcFinalPrice(cart: ICart) : number{
    return (
      cart.products.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ) + cart.deliveryPrice
    );
  }

  public close(): void {
    this.dialogRef.close();
  }

  public increaseQuantity(item: ICartItemWithQuantity): void {
    item.quantity++;
    this.updateProduct(item, this.IOPS.ALTER);
  }

  public decreaseQuantity(item: ICartItemWithQuantity): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateProduct(item, this.IOPS.ALTER);
    }
  }

  public async updateProduct(product: ICartItemWithQuantity, operation : eItemOperations){
    try {
      const cart = await firstValueFrom(this.cart$);

      if(operation === this.IOPS.ADD){
        cart.products.push(product);
      }
      if(operation === this.IOPS.REMOVE){
        cart.products = cart.products.filter((i) => i.product.id !== product.product.id);
      }
      if(operation === this.IOPS.ALTER){
        let index = cart.products.findIndex((i) => i.product.id === product.product.id);
        cart.products[index] = product;
      }
      this._cart.next(cart);
    } catch (error) {
      console.log('Error managing product.');
    }
  }

  public async updateDeliveryPrice(event: Event) {
    try {
      const cart = await firstValueFrom(this.cart$);
      cart.deliveryPrice = Number((event.target as HTMLSelectElement).value);
      this._cart.next(cart);
    } catch (error) {
      console.log('Error changing delivery price');
    }
  }

}
