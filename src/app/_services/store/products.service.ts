import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  token: String = localStorage.getItem('token');
  
  httpHeader: HttpHeaders = new HttpHeaders({
    'x-access-token': `${this.token}`
  });

  constructor(private http: HttpClient) { }

  getProducts(): any {
    return this.http.get(`${environment.backendUrl}products`, { headers: this.httpHeader });
  }

  addToCart(product:any): any {
    return this.http.post(`${environment.backendUrl}cart`, product,{ headers: this.httpHeader });
  }

  getCart(): any {
    return this.http.get(`${environment.backendUrl}cart`,{ headers: this.httpHeader });
  }

  updateCart(details:any): any {
    return this.http.put(`${environment.backendUrl}cart`,details,{ headers: this.httpHeader });
  }
  deleteCartItem(id:any): any {
    return this.http.delete(`${environment.backendUrl}cart/${id}`,{ headers: this.httpHeader });
  }

  deleteCart(): any {
    return this.http.delete(`${environment.backendUrl}cart`,{ headers: this.httpHeader });
  }

  calculateChange(received:any): any {
    return this.http.post(`${environment.backendUrl}change`, received, { headers: this.httpHeader });
  }

  makeSale(): any {
    return this.http.post(`${environment.backendUrl}sales`,null, { headers: this.httpHeader });
  }

  getSales(): any {
    return this.http.get(`${environment.backendUrl}sales`, { headers: this.httpHeader });
  }
}

