import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = "https://electioner.tk";

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<User>(this.baseUrl+'/users/login', user); 
  }

  vote(vote: any) {
    return this.http.post(this.baseUrl+'/multichain/publish', vote);
  }

  getRep(area: string, province: string) {
    return this.http.get(this.baseUrl+"/api/rep");
  }

  getResult(key: string) {
    return this.http.get(this.baseUrl+"/users/decrypt");
  }
}
