import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  CheckOutForm: FormGroup = new FormGroup({});
  CartProducts: Product[] = [];
  ProductMap: Map<number, number> = new Map();
  CartValue: number = 0;
  OrderPlaced: boolean = false;

  constructor(public formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.CheckOutForm = this.formBuilder.group({
      Name: ["", [Validators.required, Validators.minLength(6)]],
      ShippingAddress: ["", [Validators.required, Validators.minLength(10)]],
      PinCode: ["", [Validators.required, Validators.min(100000), Validators.max(999999)]],
      PhoneNumber: ["", [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      Email: ["", [Validators.required, Validators.email]]
    });
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

  checkout() {
    this.OrderPlaced = true;
    this.cartService.clearCart();
  }

}
