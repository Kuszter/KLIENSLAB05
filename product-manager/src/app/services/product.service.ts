import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products';
  private commentsUrl = 'https://dummyjson.com/comments';

  constructor(private http: HttpClient) {}

  getProducts(skip: number, limit: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}?skip=${skip}&limit=${limit}`);
  }

  getProductComments(productId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentsUrl}?postId=${productId}`);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }
}
