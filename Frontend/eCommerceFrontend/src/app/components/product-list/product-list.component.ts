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
   currentCategoryId : number = 1;
   currentCategoryName : String;
   searchMode : boolean = false; 
   productName : String;
   noResult : boolean;
   thePageNumber : number = 1;
   thePageSize : number = 5;
   theTotalElement : number = 0;
   theTotalPage : number = 0;
   previousCategoryId: number = 1;
    Summaries : number[] ;

  constructor( private productListService : ProductService, private route : ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });  
    this.Summaries = [ 5,10,15,20,50,100];
  }

  updatePageSize(strPageSize : String){
    console.log("page size change to: "+strPageSize);
    this.thePageSize = +strPageSize;
    this.listProducts();
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
    //check if we have a different category than previous. if different set the page number to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log("currentCategoryId "+this.currentCategoryId+" thePageNumber "+this.thePageNumber);
    this.productListService.getProductListPaginate(this.thePageNumber-1,this.thePageSize,this.currentCategoryId).subscribe( this.processResult())
    
  }
  processResult() {
    return data =>{
      if(data._embedded.products.length == 0){
        this.products = null;
        this.noResult = true;
      }else{
        this.noResult = false;
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElement = data.page.totalElements;
        this.theTotalPage = data.page.totalPages;
      }
    };
  }

  handleSearchProductByName(theKeyword : String) {
      this.productListService.getProductListByProductNamePaginate(theKeyword, this.thePageSize, this.thePageNumber-1).subscribe(this.processResult())
  }

}

