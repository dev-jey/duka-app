import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/_services/store/products.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  prodForm: FormGroup;
  prodFormSpinner: Boolean;
  prodCartFormSpinner:Boolean;
  prodFormApiError: any;
  prodFormSubmitted: Boolean;
  prodErrors = {
    required: "Field is required"
  };
  products: Array<any> = []
  cartLength: number = 0
  response:String = ''

  constructor(
    private prodService: ProductsService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.getProducts()
    this.getCart()

  
    //initialize login form
    this.initprodForm();

    //initialize default values
    this.prodFormSpinner = false;
    this.prodFormSubmitted = false;
    this.prodFormApiError = { hasError: false, message: "" };

  }

  /**
   * prod form initialization
   */
  initprodForm() {
    this.prodForm = this.fb.group({
      quantity: [null, Validators.required]
    });
  }


  getCart(){
    this.prodFormSubmitted = true;
    this.prodFormApiError = { hasError: false, message: "" };
    this.prodService
      .getCart()
      .subscribe(
        resp => {
          this.cartLength = resp.Cart.length;
          this.prodFormSubmitted = false;
          this.prodFormApiError = { hasError: false, message: "" };
        }, 
        error => {
          const err = error.error.Message;
          console.log(err)
          this.products = [];
          this.prodFormSubmitted = false;
          this.prodFormApiError = { hasError: true, message: err };
        });
  }



  getProducts() {
    this.prodFormSubmitted = true;
    this.prodFormApiError = { hasError: false, message: "" };
    this.prodFormSpinner = true;
    this.prodService
      .getProducts()
      .subscribe(
        resp => {
          this.products = resp.products;
          this.prodFormSpinner = false;
          this.prodFormSubmitted = false;
          this.prodFormApiError = { hasError: false, message: "" };
        }, 
        error => {
          const err = error.error.Message;
          console.log(err)
          this.products = [];
          this.prodFormSpinner = false;
          this.prodFormSubmitted = false;
          this.prodFormApiError = { hasError: true, message: err };
        });
  }

  addToCart(e, id) {
    e.preventDefault()
    this.prodFormSubmitted = true;
    this.prodFormApiError = { hasError: false, message: "" };
    if (this.prodForm.invalid) {
      return;
    }
    this.prodCartFormSpinner = true;
    const {quantity} = this.prodForm.value
    const subData = {quantity: `${quantity}`, id:`${id}`}
    this.prodService
      .addToCart(subData)
      .subscribe(
        resp => {
          this.prodFormSubmitted = false;
          this.prodFormApiError = { hasError: false, message: "" };
          this.prodCartFormSpinner = false;
          this.response = resp.Message;
          this.getCart()
        }, 
        error=>{
          console.log(error)
          this.prodFormSubmitted = false;
          this.prodFormApiError = { hasError: true, message: "" };
          this.prodCartFormSpinner = false;
          this.getCart()
        });
  }

}
