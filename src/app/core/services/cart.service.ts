import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productSubject = new Subject<any>();

  constructor() { }

  getCart() {
    return localStorage.getItem("cart");
  }

  getCartCount(): Observable<any> {
    return this.productSubject.asObservable();
  }

  addToCart(productId: number) {
    let cart = localStorage.getItem("cart");
    if(cart === null || cart === "")
      cart = productId.toString() + ",";
    else
      cart = cart + productId.toString() + ",";
    localStorage.setItem("cart", cart);
    this.productSubject.next({cartCount: localStorage.getItem("cart")?.trim().split(",").length});
  }

  clearCart() {
    localStorage.setItem("cart", "");
    this.productSubject.next({cartCount: 1});
  }

  removeFromCart(productId: number) {
    let c = localStorage.getItem("cart")?.replace(productId + ",", "");
    if(c != undefined)
      localStorage.setItem("cart", c);
    this.productSubject.next({cartCount: localStorage.getItem("cart")?.trim().split(",").length});
  }

  removeProductFromCart(productId: number) {
    const regEx = new RegExp(productId + ",", "g");
    let c = localStorage.getItem("cart")?.replace(regEx, "");
    if(c != undefined)
      localStorage.setItem("cart", c);
    this.productSubject.next({cartCount: localStorage.getItem("cart")?.trim().split(",").length});
  }
}
