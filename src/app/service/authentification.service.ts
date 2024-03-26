import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  baseURL=`https://www.playtolearn.in/`
  constructor(private router:Router) { }

  login(Username:string, Password:string){
    if(Username==="Shubham Karad" && Password==="Shubham@1211")
    {
      return 200;
    }
    else 
    {
      return 403;
    }

  }

  logout(){
    this.router.navigate(['login'])
    
  }
}
