import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  @Output() successEvent = new EventEmitter();
  cartList: any[] = [];
  cardTotal: number = 0;
  responseData: any;
  errorData: any;
  isLoading: boolean = false;
  maxQtyError: boolean = false;
  totalError: boolean = false;

  constructor(private _homeService:HomeService, private router : Router) { }

  ngOnInit() {

    this._homeService.getItem().subscribe(data => {

      this.responseData = data;
      let isItemInCart = this.cartList.find(c => this.responseData.id == c.id);

      // if product already in cart
      if(isItemInCart){

        // error if more than 3 qty
        if(isItemInCart.qty >= 3){
          this.maxQtyError = true;
          return true;
        }

        // same item increase qty
        isItemInCart.qty++;
      }else{
        // add new item in cart
        let cardData = {
          "id" : this.responseData.id,
          "name" : this.responseData.name,
          "price" : this.responseData.price,
          "qty" : 1
        }
        this.cartList.push(cardData);
      }

      // total of cart item
      this.getCardTotal();
    })
  }

  getCardTotal(){
    this.totalError = false;
    this.maxQtyError = false;
    this.cardTotal = 0;
    this.cartList.forEach(card => {
      this.cardTotal += (card.qty * card.price);
    })
  }

  fnQtyChange(product){
    // if qty 0 delete item from cart
    if(product.qty == 0){
      const index = this.cartList.indexOf(product);
      if (index >= 0) {
        this.cartList.splice(index, 1);
      }
    }else{
      product.qty = parseInt(product.qty);
    }
    this.getCardTotal();
  }

  fnCheckout(){
    if(this.cardTotal < 1000){
      this.totalError = true;
      return;
    }
    this.successEvent.emit(null);
  }

}
