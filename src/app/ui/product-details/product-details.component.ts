import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  Product: Product | undefined;

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(x => {
      x.products.forEach((element: Product) => {
        if(element.id == this.activatedRoute.snapshot.params.id) {
          this.Product = element; 
        }
      });
      if(this.Product === undefined)
        window.location.href = "products";
    });
  }

  saveCart(productid?: number) { 
    if(productid != undefined)   
      this.cartService.addToCart(productid);
    this.router.navigateByUrl("cart");
  }

}
