import { Injectable } from '@angular/core';
import { CartItem } from "../common/CartItem";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartItems : CartItem[] = [];
  totalPrice : Subject<number> = new Subject<number>();
  totalQuantity : Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem : CartItem){
    //check  if we already have the item in the cart
    let alreadyExistsInCart : boolean = false;
    let existingCartItem : CartItem = undefined;
    
    if(this.cartItems.length > 0){
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id === theCartItem.id){
           existingCartItem = tempCartItem;
        }
      }
      //check if we found it 
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    if(alreadyExistsInCart){
      //increment the quantity
      existingCartItem.quantity++;
    }else{
      //just add new item to the array
      this.cartItems.push(theCartItem);
    }
    //compute cart total and total quantity
    this.computeCartTotals();
  }

  decrementItemInCart(theCartItem: CartItem) {
    if(theCartItem.quantity > 1){
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id === theCartItem.id){
           tempCartItem.quantity--;
        }
      }
    } else {
      this.removeCartItem(theCartItem);
    }
    
    this.computeCartTotals();
  }
  removeCartItem(theCartItem: CartItem) {
    //get the index of the current cart item
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id == theCartItem.id);
    if(itemIndex > -1)
      this.cartItems.splice(itemIndex, 1);
  }

  computeCartTotals() {
    let totalPriceValue : number = 0 ;
    let totalQuantityValue : number = 0 ;
    for (let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.unitePrice * currentCartItem.quantity;
      totalQuantityValue += currentCartItem.quantity;
    }
    
    //publish new values ..... all the subscriber will receive new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
