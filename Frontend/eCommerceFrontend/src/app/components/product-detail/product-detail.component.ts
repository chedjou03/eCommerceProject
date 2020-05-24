import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/CartItem';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product : Product = new Product();

  constructor( private productService : ProductService, private cartService : CartService, private route : ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  addToCart(product : Product){
    let cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

  handleProductDetails() {
    const theProductId : number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(theProductId).subscribe(data => {
      this.product = data;
    })
  }

}
