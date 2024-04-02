import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as CryptoJs from 'crypto-js'

@Injectable({
    providedIn: 'root'
})
export class Util {
    constructor(private router: Router) { }
   
    // encryptData(data: any) {
    //     console.log(data);
        
    //     let iv = CryptoJs.enc.Base64.parse("")
    //     let key = CryptoJs.SHA256('3sc3RLrpd17')
    //     let encryptedData = CryptoJs.AES.encrypt(data, key, {
    //         iv: iv,
    //         mode: CryptoJs.mode.CBC,
    //         padding: CryptoJs.pad.Pkcs7
    //     })
    //     let encryptedDataInString = encryptedData.toString(); // No need to encodeURI
    //     console.log(encryptedDataInString);
    //     return encryptedDataInString;
    // }

    encryptData(data: any) {
        let iv = CryptoJs.enc.Base64.parse("");
        let key = CryptoJs.enc.Hex.parse(CryptoJs.SHA256('3sc3RLrpd17').toString()); // Parse key from hex
        let encryptedData = CryptoJs.AES.encrypt(JSON.stringify(data), key, {
            iv: iv,
            mode: CryptoJs.mode.CBC,
            padding: CryptoJs.pad.Pkcs7
        });
        let encryptedDataInString = encryptedData.toString();
        return encryptedDataInString;
    }
    
    decryptData(data: any) {
        let iv = CryptoJs.enc.Base64.parse("")
        let key = CryptoJs.SHA256('3sc3RLrpd17')
        let decryptedData = CryptoJs.AES.decrypt(data, key, {
            iv: iv,
            mode: CryptoJs.mode.CBC,
            padding: CryptoJs.pad.Pkcs7
        })
        let decryptedDataInString = decryptedData.toString(CryptoJs.enc.Utf8)
        
        return decryptedDataInString
    }
   
  
  


}