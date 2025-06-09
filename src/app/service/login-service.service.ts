import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:8000/api"

  login(data : any){
    return this.http.post(this.baseUrl+"/login/", data);
  }

  registerUser(data : any){
    return this.http.post(this.baseUrl+"/register/", data);
  }
}
