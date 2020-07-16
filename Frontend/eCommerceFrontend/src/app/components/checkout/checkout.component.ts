import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { CheckOutFormServiceService } from 'src/app/services/check-out-form-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup : FormGroup;

  totalPrice : number = 0;
  totalQuantity : number = 0;
  creditCardMonth : String[] = [];
  creditCardYear : number[] = [];

  constructor( private formBuilder : FormBuilder, private cartService : CartService, private checkOutFormServiceService : CheckOutFormServiceService ) { }

  ngOnInit(): void {
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    console.log("this.totalQuantity  "+this.totalQuantity );
    this.checkoutFormGroup = this.formBuilder.group({
      customer : this.formBuilder.group({
        firstName : [''],
        lastName : [''],
        email : ['']
      }),
      shippingAddress : this.formBuilder.group({
        street: [''],
        country : [''],
        state : [''],
        city : [''],
        zipCode : ['']
      }),
      billingAddress : this.formBuilder.group({
        street: [''],
        country : [''],
        state : [''],
        city : [''],
        zipCode : ['']
      }),
      creditCard : this.formBuilder.group({
        cardType : [''],
        nameOnCard : [''],
        cardNumber : [''],
        securityCode : [''],
        expirationMonth : [''],
        expirationYear : ['']
      }),
    });
    const startMonth : number = new Date().getMonth() + 1;
    this.loadCreditCardMonth(startMonth);
    this.loadCreditCardYear();

    
  }
  
  onSubmit(){
    console.log(this.checkoutFormGroup.get('customer').value.email);
  }
  
  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }else{
      this.checkoutFormGroup.controls.billingAddress.reset()
    }
  }

  onChange(){
    let selectedYyear = this.checkoutFormGroup.get('creditCard').value.expirationYear;
    let currentYear : number = new Date().getFullYear();
    this.creditCardMonth = [];
    let  startMonth : number = 0;
    if(selectedYyear > currentYear){
      startMonth = 1;
    }else{
      startMonth = new Date().getMonth() + 1;
    }
    this.loadCreditCardMonth(startMonth);
  }

  loadCreditCardMonth(startMonth :number){
    this.checkOutFormServiceService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonth = data ;
      }
    );
  }

  loadCreditCardYear() {
    this.checkOutFormServiceService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYear = data ;
      }
    );
  }


}
