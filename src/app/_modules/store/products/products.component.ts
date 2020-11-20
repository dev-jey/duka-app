import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/_services/store/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  prodFormSpinner: Boolean;
  prodCartFormSpinner: Boolean;
  prodFormApiError: any;
  prodFormSubmitted: Boolean;
  prodErrors = {
    required: "Field is required"
  };
  products: Array<any> = []
  cartLength: number = 0
  response: String = ''
  prodQuantity:number[]=[];
  current: any = { id: null };

  constructor(
    private prodService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getProducts()
    this.getCart()

    //initialize default values
    this.prodFormSpinner = false;
    this.prodFormSubmitted = false;
    this.prodFormApiError = { hasError: false, message: "" };

  }

  onForm2NameChange({ target }, i) {
    this.prodQuantity[i] = parseInt(target.value);
  }

  addQuantity(e, quantity, i) {
    e.preventDefault()
    console.log(i)
    if (this.prodQuantity[i] < quantity) {
      this.prodQuantity[i] += 1
    }
    console.log(this.prodQuantity)
  }

  subQuantity(e, i) {
    e.preventDefault()
    if (this.prodQuantity[i] > 1) {
      this.prodQuantity[i] -= 1
    }
  }


  getCart() {
    this.prodFormSubmitted = true;
    this.prodFormApiError = { hasError: false, message: "" };
    this.prodService
      .getCart()
      .subscribe(
        resp => {
          this.cartLength = resp.Cart.length;
          this.prodFormSubmitted = false;
        },
        error => {
          const err = error.error.Message;
          console.log(err)
          this.prodFormSubmitted = false;
        });
  }



  getProducts() {
    this.prodQuantity = []
    this.prodFormSubmitted = true;
    this.prodFormApiError = { hasError: false, message: "" };
    this.prodFormSpinner = true;
    this.prodService
      .getProducts()
      .subscribe(
        resp => {
          this.products = resp.products.sort((a,b) => a.title > b.title ? 1 : -1);
          this.prodFormSpinner = false;
          this.prodFormSubmitted = false;
          this.prodFormApiError = { hasError: false, message: "" };
          this.products.forEach(product =>{
            this.prodQuantity.push(1)
          })
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


  addToCart(e, id, i) {
    e.preventDefault()
    this.current = this.products.filter(item => item.id == id)[0];
    this.prodFormSubmitted = true;
    this.prodFormApiError = { hasError: false, message: "" };
    this.prodCartFormSpinner = true;
    const subData = { quantity: this.prodQuantity[i], id: id, status: 0 }
    this.prodService
      .addToCart(subData)
      .subscribe(
        resp => {
          this.prodFormSubmitted = false;
          this.prodFormApiError = { hasError: false, message: "" };
          this.prodCartFormSpinner = false;
          this.response = resp.Message;
          this.getCart()
          this.getProducts()
        },
        error => {
          console.log(error)
          this.prodFormSubmitted = false;
          this.prodFormApiError = { hasError: true, message: "" };
          this.prodCartFormSpinner = false;
          this.getCart()
          this.getProducts()
        });
  }

}
