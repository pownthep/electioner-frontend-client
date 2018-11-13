import { Component, OnInit } from '@angular/core';
import { Vote } from '../models/Vote';
import { DataService } from '../services/data.service';
import * as forge from 'node-forge';


@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})

export class VoteComponent implements OnInit {
  public vote: Vote;
  public repList: any;
  private publicKeyPem = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkHZZK4120cekvdg8UgIU
  Iu033Obajxnd1lJeUdC0puee7G/C0e/iepg5IEU/RDmQFxiJSnppmwadPmGTsyrB
  AgCgf8qaW7jwI9lkIq5PlOuzWREcc1EKqwvB381Et8QtaoiEjv6iGoyHEu8l9Dgy
  0+UK2Wvto07O5lGncLpAiADtGk2ycmqZOkmhYsnFW0xpEIYdaWhMIYKG+DUrVMpD
  0Ntr+zjKtbBYVL5kA6kjdxlKfKGW+tMCdQ8GLQMLVZgH2qrxiTSzUj7OkyXMPGcB
  +UTt985Zk/Ok9jgGRDPS312vKzqFALVj3tX+ZV/g7NyWCkN1LdW9peUZRxqrHxI5
  dwIDAQAB  
  -----END PUBLIC KEY-----`;
  public rsa = forge.pki.rsa;
  private publicKey = forge.pki.publicKeyFromPem(this.publicKeyPem);
  public candidates$;
  constructor( private data: DataService) { 
  }
  public showSpinner: boolean = true;
  ngOnInit() {
    this.data.getRep("1","").subscribe(
      data => {this.candidates$ = data; console.log(this.candidates$); this.showSpinner = false},
      err => {this.candidates$ = {}}
    )
    console.log(localStorage["PUBLIC_KEY"]);
  }

  onVote(id: string){
      var tmp = this.publicKey.encrypt(id);
      console.log('Message to be sent: ' + '"'+id+'"');
      console.log('Encrypted message to be sent: ' + '"'+tmp+'"');
      var vote = new Vote("test4", "01", tmp);
      this.data.vote(vote).subscribe(
        data => {
          console.log('Transaction id: ' + data);
        },
        err => console.log(err)
      )
  }

  public getBase64Encrypted(randomWordArray, pemKey): string {
    const pk = forge.pki.publicKeyFromPem(pemKey);
    return forge.util.encode64(pk.encrypt(forge.util.hexToBytes(randomWordArray)));
  }
}
