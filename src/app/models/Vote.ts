import { HexBase64BinaryEncoding } from "crypto";

export class Vote{
    constructor(
      public stream: string,
      public key: string,
      public data: any
    ) {}
 }