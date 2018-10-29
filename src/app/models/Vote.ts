export class Vote{
    constructor(
      public stream: string,
      public key: string,
      public data: {
        candidate: string,
        party: string
      }
    ) {}
 }