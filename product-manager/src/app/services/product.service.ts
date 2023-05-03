import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(skip: number, limit: number): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(`${this.baseUrl}?skip=${skip}&limit=${limit}`).pipe(
      map((response) => response.products)
    );
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }
}
