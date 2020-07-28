import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = "https://electioner-heroku.herokuapp.com";

  constructor(private http: HttpClient) { }

  getReps() {
    return this.http.get(this.baseUrl+"/api/rep");
  }

  getRepByParty(party: string) {
    return this.http.post(this.baseUrl+"/api/listreps",{party: party});
  }

  getResult(name: string): Observable<any> {
    return this.http.get(this.baseUrl+"/multichain/count/"+name);
  }

  getParties():Observable<any> {
    return this.http.get(this.baseUrl+'/api/party');
  }

  getElections() {
    return this.http.get(this.baseUrl+"/api/list/elections")
  }
}
