import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList:any[] = [];
  responseData: any;
  errorData: any;
  isLoading: boolean = false;

  constructor(private _homeService:HomeService) { }

  ngOnInit() {
    // get products data
    this.getProductList();
  }

  getProductList(){
    this._homeService.getProductList().subscribe(data => {

      this.responseData = data;
      this.productList = this.responseData;
      this.isLoading = false;
    }, err => {
        console.error(err);
        this.isLoading = false;
        this.errorData = 'Something went wrong.';
    });
  }

  fnAddToCart(product){
    this._homeService.sendItem(product);
  }


}
