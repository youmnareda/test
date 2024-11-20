import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  getAllProducts() {
    return this.http.get('https://fakestoreapi.com/products')
  }

  getAllCategories() {
    return this.http.get('https://fakestoreapi.com/products/categories')
  }

  getProductsByCategories(keyword: string) {
    return this.http.get('https://fakestoreapi.com/products/category/' + keyword)
  }

  getProductsById(id:any) {
    return this.http.get('https://fakestoreapi.com/products/' + id)
  }
}
