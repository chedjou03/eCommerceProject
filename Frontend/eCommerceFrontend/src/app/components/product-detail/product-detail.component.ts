import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product : Product = new Product();

  constructor( private productService : ProductService, private route : ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    const theProductId : number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(theProductId).subscribe(data => {
      this.product = data;
    })
    console.log(">>>>>> the product:"+this.product);
  }

}