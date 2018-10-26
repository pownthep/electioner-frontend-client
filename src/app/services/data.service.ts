import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = "https://35.186.153.108";

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<User>(this.baseUrl+'/users/login', user); 
  }
  vote(vote: any) {
    return this.http.post(this.baseUrl+'/multichain/publish', vote);
  }

  getRep(area: string) {
    return this.http.get(this.baseUrl+"/api/area/"+area);
  }
}
