import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardServiceService } from '../dashboard-service.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ MatTableModule,
    MatPaginatorModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  // Table header details
  productsTableColumnName = ["id","name","price","img","action"]
    @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  allProductsList: any;
  ProductDatasource: any;
  addProductsForm!: FormGroup;
  searchForm!: FormGroup;

  constructor(private _dashboardService : DashboardServiceService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getAllProducts();
    this.addProductFormInit();
    this.searchFormInit();
  }


  // Get all products
  getAllProducts(){
    this._dashboardService.getAllProducts().subscribe({
      next : (res:any) =>{
        console.log(res);
        this.allProductsList = res;
        this.ProductDatasource = new MatTableDataSource(this.allProductsList);
        this.ProductDatasource.paginator = this.paginator;

      }
    })
  }

  deleteItem(id : any){
    console.log("Product deleted succesfully ",id)
  }

  addProductFormInit(){
    this.addProductsForm = new FormGroup({
      productId : new FormControl(''),
      productName : new FormControl(''),
      productPrice : new FormControl(''),
      productPic : new FormControl('')
    })
  }

  searchFormInit(){
    this.searchForm = new FormGroup({
      searchType : new FormControl(''),
      searchValue : new FormControl('')
    })
  }

  addProduct(){
    console.log(this.addProductsForm.controls)
  }

  search() {
    let filteredData:any = [];
    let searchType = this.searchForm.controls['searchType'].value;
    let searchValue = this.searchForm.controls['searchValue'].value;
    console.log(searchType, searchValue)
    if(searchType == "Id"){
      filteredData = this.allProductsList.filter((ele: any) => {
        return ele.id.toString().includes(searchValue.toLowerCase());  });
    }
    if(searchType == "Name"){
      filteredData = this.allProductsList.filter((ele: any) => {
        return ele.pname.toLowerCase().includes(searchValue.toLowerCase());  });
    }
    if(searchType == "Price"){
      filteredData = this.allProductsList.filter((ele: any) => {
        return ele.pprice.toLowerCase().includes(searchValue.toLowerCase());  });
    }
    this.ProductDatasource = new MatTableDataSource(filteredData);
  console.log(filteredData);
  }

  onSelectionChange(){
    this.getAllProducts();
  }

  openChatBoat(){
    this.router.navigate(["dashboard/chat"])
  }
}
