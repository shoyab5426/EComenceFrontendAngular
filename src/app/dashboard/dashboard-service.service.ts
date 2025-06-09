import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:8000/api"

  getAllProducts(){
    return this.http.get(this.baseUrl+"/products/");
  }

  addProducts(){
    return this.http.get(this.baseUrl+"/products/add/");
  }
}
