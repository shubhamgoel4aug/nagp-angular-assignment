import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  Products: Product[] = [];
  FilteredProducts: Product[] = [];
  TotalProductRows: number = 0;
  SearchForm: FormGroup = new FormGroup({});

  constructor(public formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(x => {
      this.FilteredProducts = x.products;
      this.Products = x.products;
      this.TotalProductRows = Math.ceil(x.products.length / 4);
    });
    this.SearchForm = this.formBuilder.group({
      query: ["", Validators.required],
      category: [""]
    });
    this.SearchForm.get("category")?.setValue("Select Category", {onlyself: true});
  }

  saveCart(product: Product) {
    this.cartService.addToCart(product.id);
  }

  showDetails(product: Product) {
    this.router.navigateByUrl(`products/${product.id}`);
  }

  search() {
    let category = this.SearchForm.get("category")?.value;
    if(category !== "Select Category")
      this.FilteredProducts = this.Products.filter(x => x.category === category && x.name.includes(this.SearchForm.get("query")?.value));
    else
      this.FilteredProducts = this.Products.filter(x => x.name.includes(this.SearchForm.get("query")?.value));
  }

  onCategoryChange() {
    let category = this.SearchForm.get("category")?.value;
    if(category !== "Select Category")
      this.FilteredProducts = this.Products.filter(x => x.category === category);
    else
      this.FilteredProducts = this.Products;
    this.SearchForm = this.formBuilder.group({
      query: ["", Validators.required],
      category: [this.SearchForm.get("category")?.value]
    });
  }

}
