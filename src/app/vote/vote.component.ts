import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
  MIIEowIBAAKCAQEAkHZZK4120cekvdg8UgIUIu033Obajxnd1lJeUdC0puee7G/C
  0e/iepg5IEU/RDmQFxiJSnppmwadPmGTsyrBAgCgf8qaW7jwI9lkIq5PlOuzWREc
  c1EKqwvB381Et8QtaoiEjv6iGoyHEu8l9Dgy0+UK2Wvto07O5lGncLpAiADtGk2y
  cmqZOkmhYsnFW0xpEIYdaWhMIYKG+DUrVMpD0Ntr+zjKtbBYVL5kA6kjdxlKfKGW
  +tMCdQ8GLQMLVZgH2qrxiTSzUj7OkyXMPGcB+UTt985Zk/Ok9jgGRDPS312vKzqF
  ALVj3tX+ZV/g7NyWCkN1LdW9peUZRxqrHxI5dwIDAQABAoIBAAqljkDVdjJTwmJz
  c06f9Jf2X62aHfV59I19GJJzDT1XyLCoM/WA9nIOkfc840LF80agek3Q48OXIzOb
  wWTs+7iID0wbxHCKGrippuWfbyIMlPU1e6FMEbs1bJ5v5GaewLIfSZW4Un4eaT4N
  /gAXvDc9pCUN/T+R6VG0JuD5+ROM0ZNyjASquAKopqp8la4Q5QT5jk82fMfuXOlQ
  YGHHGiQArdHlCn+qIYPrNIk5HdueO/BknYkJ/JXOMzP/fRe88+A463ThS3X4iUVm
  8i659PLNkMHq8IcNRAnF0z6Lj3Sp/jGVz2Hxsz9IVxK48KnRWPhdxaNm1mOZ11CK
  w0UolGECgYEAwr7KxSrFaI5tt2jNyIOPwrCd5aKpcxlfs1K5Jzwl+kbEc17NxUT1
  CNl5aSvOspw9zyK/noTouE2agCvqdiHaJl6ub3bQuDhIfpcgv8IUH5n/9cXA7YHR
  49C8lk8Oa3m9NRW4WdkkDPRFOMJC3eLAuAqyOKSBRkh7SKfR2SW0f08CgYEAveaw
  OA3woRGWhF0+cYTPrFFaomAyf6XqY0yVr2QJvNA4lXd7pJ8FqbA7u799oUKGRynw
  fzXO2sE5vmNTQFVy2a8Jxo+lypcnOHRtzYda2hBE4wWnGsQfrsCt8oj6ryZfIgRV
  6d55NqOQiolaht5UHRYAOPnhkaF0r1EMnqwY2VkCgYEAhClu+re4GOjv1JSvcvC1
  026A+aKWVKJXrB7rwJC1RVBZaeJgywutL0BHgPRV5ijaWYQ/fpi8RreDrpAfIeR/
  Y6LFxqdfpmWr7R0rAHf5qCie6HA4Kfb8NhsmoOst4gpQOYJwBamzKYdsosRTFLoa
  B8xafs5FXSk7YWdipndMM0kCgYAbP8rxgC6TLi7m92pKZ8BU/ad/vUYBwxELBqZD
  8JrlGQvFhsubJ6ZsXvlzS1r/lMgn1gDIgDQad7eNdjsv9BLy4YcJkvs7Qs1B8JMA
  9vc2azc3TExaLuJM9SEAuF8gWuUzwGODl4TVLktDVcpDqAtx0QJfKpwPhZd0wLCK
  5C78oQKBgBKjo2fVNNA/7O2qhf+ZiSRrhJucSAY5w3bsyjXPSBdDvbJo43o2eXJG
  x5vSU8EnU2m//65nAbn4PjLOtD+86hQRsmBZAOqqgXzLGw1Ht4tLmSn5zdzg/deD
  2mv/nlBy1rCTVKVg4N5AwX353B4MtmXVNYI2PDebnImMvBdtfva4
  -----END RSA PRIVATE KEY-----`;
  private publicKey = forge.pki.publicKeyFromPem(this.publicKeyPem);
  private privateKey = forge.pki.privateKeyFromPem(this.privateKeyPem);

  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {

  }

  onVote(){
  }

  public getBase64Encrypted(randomWordArray, pemKey): string {
    const pk = forge.pki.publicKeyFromPem(pemKey);
    return forge.util.encode64(pk.encrypt(forge.util.hexToBytes(randomWordArray)));
  }

  onClick() {
    var tmp = this.publicKey.encrypt("Hello")
    console.log(tmp);
    var vote = new Vote("test", "test", tmp);
    this.data.vote(vote).subscribe(
      data => console.log(data),
      err => console.log(err)
    )
  }
}
