import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  constructor(private httpClient:HttpClient) { }

  private baseUrl = "http://localhost:8080/api/products";
  private productCategoryUrl = "http://localhost:8080/api/product_category";

  getProductList(categoryId : number): Observable<Product[]>{
    //need to build to URL based on that categoryId
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?Id=${categoryId}`;
    
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories() : Observable<ProductCategory[]>{
   return this.httpClient.get<GetResponseProductCategory>(this.productCategoryUrl).pipe(map(response => response._embedded.productCategory));
  } 

}

interface GetResponseProduct{
  _embedded :{
    products : Product[];
  }
}

interface GetResponseProductCategory{
  _embedded :{
    productCategory : ProductCategory[];
  }
}
