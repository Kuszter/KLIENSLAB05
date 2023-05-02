import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Product } from '../app/models/product';
import { ProductComment } from '../app/models/comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  productComments: ProductComment[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    for (let skip = 0; skip < 100; skip += 30) {
      this.productService.getProducts(skip, 30).subscribe((products) => {
        products.forEach((productData) => {
          const product = new Product(productData);
          this.products.push(product);
  
          this.productService.getProductComments(product.id).subscribe((comments) => {
            product.comments = comments.map((commentData) => new ProductComment(commentData));
          });
        });
      });
    }
  }
  

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.products = this.products.filter((p) => p.id !== product.id);
    });
  }

  // Update selectProduct method in AppComponent
// Change this line


// Update selectProduct method in AppComponent
selectProduct(product: Product): void {
  this.selectedProduct = product;
  this.productComments = this.productComments || [];
  this.productService.getRandomComments(product.id, 10).subscribe((comments) => {
    this.productComments = comments;
  });
}



  closeProductDetails(): void {
    this.selectedProduct = null;
  }

  countCategory(): void {
    const categoryCount = this.products.reduce<{ [key: string]: number }>((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
  
    alert(JSON.stringify(categoryCount));
  }
  

  maxDiscount(): void {
    const maxDiscountProduct = this.products.reduce((prev, current) => {
      return prev.discountPercentage > current.discountPercentage ? prev : current;
    });

    alert(`A legnagyobb kedvezmény: ${maxDiscountProduct.discountPercentage}%`);
  }

  priceLevel(): void {
    const avgPrice = this.products.reduce((acc, product) => acc + product.price, 0) / this.products.length;
    const aboveAvgProducts = this.products.filter((product) => product.price > avgPrice);

    alert(
      `Az átlagos árszint feletti termékek: ${aboveAvgProducts
        .map((product) => `ID: ${product.id}, Név: ${product.title}`)
        .join(', ')}`
    );
  }
}
