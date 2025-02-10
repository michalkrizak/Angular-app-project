import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  standalone: true,
})
export class CartComponent {
  constructor(public dialogRef: MatDialogRef<CartComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
