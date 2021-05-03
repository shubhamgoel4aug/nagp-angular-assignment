import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  CartProducts: Product[] = [];
  ProductMap: Map<number, number> = new Map();
  CartValue: number = 0;

  constructor(private cartService: CartService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.CartProducts = [];
    this.ProductMap.clear();
    this.CartValue = 0;
    this.activatedRoute.data.subscribe(products => {
      let cart = this.cartService.getCart()?.trim().split(",");
      console.log(cart);
      cart?.forEach(x => {
        let id = parseInt(x);
        if(this.ProductMap.has(id) && this.ProductMap) {
          let quantity = this.ProductMap.get(id);
          if(quantity != undefined)
            this.ProductMap.set(id, quantity+1)
        }
        else {
          this.ProductMap.set(id, 1);
        }     
      });
      products.products.forEach((element: Product) => {
        if(this.ProductMap.has(element.id)) {
          this.CartProducts.push(element);
          let _pm = this.ProductMap.get(element.id);
          if(_pm != undefined)
            this.CartValue += _pm * element.price;
        }
      });
      console.log(this.CartValue);

    });
  }

  plusQuantity(productId: number) {
    if(productId != undefined){
      this.cartService.addToCart(productId);
    }
    this.loadData();
  }

  minusQuantity(productId: number) {
    if(productId != undefined) {
      this.cartService.removeFromCart(productId);
    }
    this.loadData();
  }

  deleteProduct(productId: number) {
    if(productId != undefined) {
      this.cartService.removeProductFromCart(productId);
    }
    this.loadData();
  }

  checkout() {
    this.router.navigateByUrl("checkout");
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadData();
  }

}
