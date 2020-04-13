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


  

  constructor( private productListService : ProductService, private route : ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });  
  }

  listProducts() {
    //check if "id" parameter is available
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else{
      // not categoryid avaible .... default to id 1
      this.currentCategoryId = 1;
    }
    this.productListService.getProductList(this.currentCategoryId).subscribe(
      data =>{
        console.log("data"+data);
        this.products = data;
      }
    )
  }

}
