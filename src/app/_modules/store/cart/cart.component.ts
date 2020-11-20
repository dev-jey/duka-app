import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/_services/store/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  prodFormSpinner: Boolean;
  prodCartFormSpinner: Boolean;
  prodFormApiError: any;
  prodFormSubmitted: Boolean;
  prodErrors = {
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

  constructor(
    private prodService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getCart()

    //initialize default values
    this.prodFormSpinner = false;
    this.prodFormSubmitted = false;
    this.prodFormApiError = { hasError: false, message: "" };

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
          this.cartList = this.cartDetails.Cart.sort((a,b) => a.title > b.title ? 1 : -1);
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
          this.cartList = this.cartDetails.Cart.sort((a,b) => a.title > b.title ? 1 : -1);
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
        });
  }



}
