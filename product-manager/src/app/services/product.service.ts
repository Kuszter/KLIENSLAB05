import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';
import { ProductComment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products';
  private commentsUrl = 'https://dummyjson.com/comments';

  constructor(private http: HttpClient) {}

  getProducts(skip: number, limit: number): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(`${this.baseUrl}?skip=${skip}&limit=${limit}`).pipe(
      map((response) => response.products)
    );
  }
  
  // Add this method to ProductService
  getRandomComments(productId: number, limit: number): Observable<ProductComment[]> {
    return this.http.get<ProductComment[]>(`${this.commentsUrl}?limit=${limit}&skip=${productId * limit}&select=body,postId`);
  }


  getProductComments(productId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentsUrl}?postId=${productId}`);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }
}
