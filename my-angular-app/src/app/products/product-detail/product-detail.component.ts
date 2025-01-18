import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FakeStoreService } from '../../services/fake-store.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [CommonModule, RouterModule],
  
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private fakeStoreService: FakeStoreService
  ) {}

  ngOnInit(): void {
    // Získání ID produktu z URL
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    // Načtení detailů produktu
    this.fakeStoreService.getProductById(productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });
  }
  buyProduct(): void {
    alert(`Thank you for buying ${this.product.title}!`);
  }
}
