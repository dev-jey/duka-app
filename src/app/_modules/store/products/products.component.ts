import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/_services/store/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  prodFormSpinner: Boolean;
  prodCartFormSpinner: Boolean;
  prodFormApiError: any;
  prodFormApiErrorCart: any = { hasError: false, message: "" };
  prodFormSubmitted: Boolean;
  prodErrors = {
    required: "Field is required"
  };
  products: Array<any> = []
  cartLength: number = 0
  response: String = ''
  prodQuantity:any;
  current: any = { id: null };

  constructor(
    private prodService: ProductsService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCart()
    this.getProducts()

    //initialize default values
    this.prodFormSpinner = false;
    this.prodFormSubmitted = false;
    this.prodFormApiError = { hasError: false, message: "" };

  }

  searchProduct(e){
    e.preventDefault();
    this.products = this.products.filter(prod => prod.title.toUpperCase().includes(e.target.value.toUpperCase()));
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
  }

  logout(e){
    e.preventDefault();
    localStorage.removeItem("token");
    this.router.navigateByUrl("/");
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
          this.prodFormSubmitted = false;
        });
  }



  getProducts() {
    this.prodQuantity = []
    this.prodFormSubmitted = true;
    this.prodFormApiError = { hasError: false, message: "" };
    this.prodFormSpinner = true;
    this.toastr.info(`Loading...`, 'Info!');
    this.prodService
      .getProducts()
      .subscribe(
        resp => {
          this.toastr.clear();
          this.products = resp.products.sort((a, b) => a.title > b.title ? 1 : -1);
          this.prodFormSpinner = false;
          this.prodFormSubmitted = false;
          this.prodFormApiError = { hasError: false, message: "" };
          this.products.forEach(product => {
            this.prodQuantity.push(1)
          })
        },
        error => {
          this.toastr.clear();
          const err = error.error.Message;
          this.products = [];
          this.prodFormSpinner = false;
          this.prodFormSubmitted = false;
          this.prodFormApiError = { hasError: true, message: err };
        });
  }


  addToCart(e, id, i) {
    e.preventDefault()
    this.prodFormApiErrorCart = { hasError: false, message: "" };
    if(!this.prodQuantity[i]){
      this.prodFormApiErrorCart = { hasError: true, message: "Enter a quantity"};
      this.toastr.error("Enter a quantity", 'Error!');
      return;
    }
    this.current = this.products.filter(item => item.id == id)[0];
    this.prodFormSubmitted = true;
    this.prodCartFormSpinner = true;
    const subData = { quantity: this.prodQuantity[i], id: id, status: 1 }
    this.prodService
      .addToCart(subData)
      .subscribe(
        resp => {
          this.prodFormSubmitted = false;
          this.prodFormApiErrorCart = { hasError: false, message: "" };
          this.prodCartFormSpinner = false;
          this.getProducts()
          this.getCart()
          this.toastr.success(`Added ${resp.quantity - resp.available_stock} ${resp.Title}(s) to cart`, 'Success!');
        },
        error => {
          this.prodFormSubmitted = false;
          this.prodFormApiErrorCart = { hasError: true, message: error.error.Message || error.error.message };
          this.prodCartFormSpinner = false;
          this.getCart()
          this.getProducts()
          this.toastr.error(`${error.error.Message || error.error.message}`, 'Error!');
        });
  }

}
