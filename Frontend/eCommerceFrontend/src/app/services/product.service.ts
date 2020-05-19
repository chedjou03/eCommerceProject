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
  private searchProductByNameUrl = "http://localhost:8080/api/products/search/findByNameContaining?name";
  private getProductByIdUrl = "http://localhost:8080/api/products";

  getProductList(categoryId : number): Observable<Product[]>{
    //need to build to URL based on that categoryId
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?Id=${categoryId}`;
    
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductListPaginate(thePage : number, thePageSize : number, categoryId : number): Observable<GetResponseProduct>{
    //need to build to URL based on that categoryId, page and pageSize
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?Id=${categoryId}`+`&page=${thePage}&size=${thePageSize}`;
    
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProductCategories() : Observable<ProductCategory[]>{
   return this.httpClient.get<GetResponseProductCategory>(this.productCategoryUrl).pipe(map(response => response._embedded.productCategory));
  } 

  getProductListByProductName(productName : String) : Observable<Product[]>{
    const searchProductByName = `${this.searchProductByNameUrl}=${productName}`;
    return this.httpClient.get<GetResponseProduct>(searchProductByName).pipe(map(response => response._embedded.products));
  }

  getProduct(productId : number) : Observable<Product>{
    const getProductByIdUrl = `${this.getProductByIdUrl}/${productId}`
    return this.httpClient.get<Product>(getProductByIdUrl);
  }
}

interface GetResponseProduct{
  _embedded :{
    products : Product[];
  },
  page:{
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

interface GetResponseProductCategory{
  _embedded :{
    productCategory : ProductCategory[];
  }
}
