import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/_services/store/products.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  saleFormSpinner: Boolean;
  saleFormApiError: any;
  saleFormApiErrorCart: any = { hasError: false, message: "" };
  saleFormSubmitted: Boolean;
  cartLength: number = 0
  total: Number = 0;
  prodFormApiError: any;
  prodFormSubmitted: Boolean;
  sales:Array<any> = []
  constructor(
    private prodService: ProductsService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getCart()
    this.getSales()
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

  logout(e){
    e.preventDefault();
    localStorage.removeItem("token");
    this.router.navigateByUrl("/");
  }

  getSales(){
    this.saleFormSubmitted = true;
    this.saleFormApiError = { hasError: false, message: "" };
    this.saleFormSpinner = true;
    this.prodService
      .getSales()
      .subscribe(
        resp => {
          this.sales = resp.Sales.sort((a, b) => a.date > b.date ? 1 : -1);
          this.total = resp.Total;
          this.saleFormSpinner = false;
          this.saleFormSubmitted = false;
          this.saleFormApiError = { hasError: false, message: "" };
        },
        error => {
          const err = error.error.Message;
          console.log(err)
          this.sales = [];
          this.saleFormSpinner = false;
          this.saleFormSubmitted = false;
          this.saleFormApiError = { hasError: true, message: err };
        });
  }

}
