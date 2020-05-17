import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

   products: Product[];
   currentCategoryId : number ;
   currentCategoryName : String;
   searchMode : boolean; 
   productName : String;
   noResult : boolean;

  

  constructor( private productListService : ProductService, private route : ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });  
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.productName = this.route.snapshot.paramMap.get('keyword');
      this.handleSearchProductByName(this.productName);
    }else{
      this.handleListProducts();
    }
    
  }

  handleListProducts(){
    //check if "id" parameter is available
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      this.currentCategoryName = this.route.snapshot.paramMap.get('categoryName');
    } else{
      // not categoryid avaible .... default to id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = "Books";
    }
    this.productListService.getProductList(this.currentCategoryId).subscribe(
      data =>{
        console.log("data"+data);
        this.products = data;
      }
    )
  }

  handleSearchProductByName(theKeyword : String) {
      this.productListService.getProductListByProductName(theKeyword).subscribe(
        data =>{
          if(data.length == 0){
            this.products = null;
            this.noResult = true;
          }else{
            this.noResult = false;
            this.products = data;
          }
          
        }
      )
  }


}
