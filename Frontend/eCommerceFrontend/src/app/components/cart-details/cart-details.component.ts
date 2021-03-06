import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/CartItem';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems : CartItem[] = [];
  totalPrice : number = 0;
  totalQuantity :number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.listCartDetail();
  }
  listCartDetail() {
    //get the handle to the cart items
    this.cartItems = this.cartService.cartItems;

    //subscribe to the cart total price
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);

    //subscribe to cart total quantity
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);

    //compute the cart total price
    this.cartService.computeCartTotals();
  }

  computerItemSubTotal(cartItem : CartItem) : number {
    return cartItem.quantity*cartItem.unitePrice;
  }
  incrementQuantity(cartItem : CartItem){
    this.cartService.addToCart(cartItem);
  }
  decrementQuantity(cartItem : CartItem){
    this.cartService.decrementItemInCart(cartItem);
  }

}
