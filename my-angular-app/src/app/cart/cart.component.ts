import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FakeStoreService, ICartItem, IProduct } from '../services/fake-store.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

export interface ICartItemWithQuantity{
    product: IProduct;
    quantity: number;
  }

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [CommonModule]
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
  in : number = 0;
  deliveryPrice: number = 10;

  
  

  constructor(public dialogRef: MatDialogRef<CartComponent>, private fakeStoreService: FakeStoreService, private authService: AuthService) {}
  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
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
