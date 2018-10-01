import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = "https://localhost";

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<User>(this.baseUrl+'/users/login', user); 
  }
}
