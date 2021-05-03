import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  UserName?: string = "";
  CartCount?: number = 0;
  private subscriptionName: Subscription;
  IsLoggedIn: boolean= false;
  Language: string = "en";

  constructor(private cartService: CartService, private readonly router: Router, private languageService: LanguageService) {
    this.subscriptionName = this.cartService.getCartCount().subscribe(x => {
      this.CartCount = x.cartCount - 1;
    })
    
  }

  ngOnInit(): void {
    this.IsLoggedIn = localStorage.getItem("IsLoggedIn")?.toString() == "True" ? true : false;
    this.UserName = localStorage.getItem("UserName")?.toString();
    let cc = localStorage.getItem("cart")?.trim().split(",").length;
    if(cc != undefined)
      this.CartCount = cc - 1;
    let l = localStorage.getItem("language");
    if(l != null)
      this.Language = l;
  }

  logout() {
    localStorage.setItem("IsLoggedIn", "False");
    localStorage.setItem("UserName", "");
    window.location.href = "products";
  }

  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
    this.Language = language;
  }

}
