import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';

interface Party {
  _id: String,
  name: String,
  number: Number,
  url: String
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = "https://electioner-heroku.herokuapp.com";

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<User>(this.baseUrl+'/users/login', user); 
  }

  vote(vote: any) {
    return this.http.post(this.baseUrl+'/multichain/publish', vote);
  }

  getReps() {
    return this.http.get(this.baseUrl+"/api/rep");
  }

  getRepByParty(party: string) {
    return this.http.post(this.baseUrl+"/api/listreps",{party: party});
  }

  getResult() {
    return this.http.get(this.baseUrl+"/multichain/count/election3");
  }

  getParties():Observable<any> {
    return this.http.get(this.baseUrl+'/api/party');
  }
}
