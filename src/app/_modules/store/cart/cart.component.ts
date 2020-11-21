import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/_services/store/products.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  prodFormSpinner: Boolean;
  prodCartFormSpinner: Boolean;
  prodFormApiError: any = { hasError: false, message: "" };;
  prodFormSubmitted: Boolean;
  prodErrors = {
    required: "Field is required"
  };


  changeForm: FormGroup;
  changeFormSpinner: Boolean;
  changeFormApiError: any = { hasError: false, message: "" };;
  changeFormSubmitted: Boolean;
  changeErrors = {
    required: "Field is required"
  };

  products: Array<any> = []
  cartList: Array<any> = []
  cartLength: number = 0
  response: String = ''
  prodQuantity: number[] = [];
  current: any = { id: null };
  cartDetails: any = {
    Total: 0,
    Cart: [],
    Message: ""
  }
  payWithCash: Boolean;
  change: Number;

  constructor(
    private prodService: ProductsService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCart()

    this.initChangeForm();
    //initialize default values
    this.prodFormSpinner = false;
    this.prodFormSubmitted = false;
    this.prodFormApiError = { hasError: false, message: "" };

  }


  initChangeForm() {
    this.changeForm = this.fb.group({
      received: [null, Validators.required],
    });
  }

  addQuantity(e, quantity, i, id) {
    e.preventDefault()
    console.log(quantity)
    if (quantity > 0) {
      this.prodQuantity[i] += 1 
      this.updateCart(i, id, 1)
    }
  }

  subQuantity(e, i, id) {
    e.preventDefault()
    if (this.prodQuantity[i] > 1) {
      this.prodQuantity[i] -= 1
      this.updateCart(i, id, 2)
    }
  }

  updateCart(i, id, status) {
    this.prodFormSubmitted = true;
    this.prodFormApiError = { hasError: false, message: "" };
    this.prodFormSpinner = true
    this.prodService
      .updateCart({"id":id,"quantity":this.prodQuantity[i], "status": status})
      .subscribe(
        resp => {
          this.cartLength = resp.Cart.length;
          this.cartDetails = resp;
          this.cartList = this.cartDetails.Cart.sort((a,b) => a.product.title > b.product.title ? 1 : -1);
          this.prodFormSubmitted = false;
          this.prodFormSpinner = false;
          resp.Cart.forEach(product =>{
            this.prodQuantity.push(product.quantity)
          })
          this.prodFormApiError = { hasError: false, message: "" };
          this.getCart()
        },
        error => {
          const err = error.error.Message;
          this.prodFormSubmitted = false;
          this.prodFormSpinner = false;
          this.prodFormApiError = { hasError: true, message: err};
          this.getCart()
        });
  }

  getCart() {
    this.prodFormSubmitted = true;
    this.prodFormApiError = { hasError: false, message: "" };
    this.prodFormSpinner = true
    this.prodService
      .getCart()
      .subscribe(
        resp => {
          this.cartLength = resp.Cart.length;
          this.cartDetails = resp;
          this.cartList = this.cartDetails.Cart.sort((a,b) => a.product.title > b.product.title ? 1 : -1);
          this.prodFormSubmitted = false;
          this.prodFormSpinner = false;
          resp.Cart.forEach(product =>{
            this.prodQuantity.push(product.quantity)
          })
          this.prodFormApiError = { hasError: false, message: "" };
        },
        error => {
          const err = error.error.Message;
          this.prodFormSubmitted = false;
          this.prodFormSpinner = false;
          this.prodFormApiError = { hasError: true, message: err};
          this.cartLength = 0;
          this.cartDetails = {
            Total: 0,
            Cart: [],
            Message: ""
          };
          this.cartList = [];
          this.prodQuantity = [];
        });
  }

  deleteCartItem(e, id) {
    e.preventDefault()
    this.prodFormSubmitted = true;
    this.prodFormApiError = { hasError: false, message: "" };
    this.prodFormSpinner = true
    this.prodService
      .deleteCartItem(id)
      .subscribe(
        resp => {
          this.prodFormSubmitted = false;
          this.prodFormSpinner = false;
          this.getCart()
        },
        error => {
          this.prodFormSubmitted = false;
          this.prodFormSpinner = false;
          this.getCart()
        });
  }

  deleteCart(e) {
    e.preventDefault()
    this.prodFormSubmitted = true;
    this.prodFormApiError = { hasError: false, message: "" };
    this.prodFormSpinner = true
    this.prodService
      .deleteCart()
      .subscribe(
        resp => {
          this.prodFormSubmitted = false;
          this.prodFormSpinner = false;
          this.getCart()
        },
        error => {
          this.prodFormSubmitted = false;
          this.prodFormSpinner = false;
          this.getCart()
        });
  }

  paymentOptions(option){
    if(option == 1){
      this.payWithCash = true;
    }
    else{
      this.payWithCash = false;
    }
  }

  calculateChange(e){
    e.preventDefault();

    this.changeFormSubmitted = true;
    this.changeFormApiError = { hasError: false, message: "" };
    //validate form
    if (this.changeForm.invalid) {
      return;
    }
    //api integration
    this.changeFormSpinner = true;
    
    this.prodService
      .calculateChange(this.changeForm.value)
      .subscribe(
        resp => {
          this.changeFormSubmitted = false;
          this.changeFormSpinner = false;
          this.change = resp.Change;
          this.changeFormApiError = { hasError: false, message: "" };
        },
        error => {
          this.changeFormSubmitted = false;
          this.changeFormSpinner = false;
          this.changeFormApiError = { hasError: true, message: error.error.Error };
        });
  }


  makeSale(e){
    e.preventDefault();

    this.changeFormApiError = { hasError: false, message: "" };
    //api integration
    this.changeFormSpinner = true;
    
    this.prodService
      .makeSale()
      .subscribe(
        resp => {
          this.changeFormSpinner = false;
          this.changeFormApiError = { hasError: false, message: "" };

          this.router.navigate(["shop"]);
        },
        error => {
          console.log(error)
          this.changeFormSpinner = false;
          this.changeFormApiError = { hasError: true, message: error.error.Error };
        });
  }

}
