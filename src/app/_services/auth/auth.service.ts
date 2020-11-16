import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserLogin} from '../../_models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: UserLogin):any {
    return this.http.post(`${environment.backendUrl}auth/login`, user);
  }
}
