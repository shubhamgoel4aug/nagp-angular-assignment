import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './ui/cart/cart.component';
import { CheckoutComponent } from './ui/checkout/checkout.component';
import { AuthenticationGuard } from './ui/guards/authentication.guard';
import { LoginComponent } from './ui/login/login.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';
import { ProductsComponent } from './ui/products/products.component';
import { ProductsResolver } from './ui/resolver/products.resolver';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "products", component: ProductsComponent, resolve: {
      products: ProductsResolver
    }
  },
  {
    path: "products/:id", component: ProductDetailsComponent, resolve: {
      products: ProductsResolver
    }
  },
  {
    path: "cart", component: CartComponent, resolve: {
      products: ProductsResolver
    }, canActivate: [AuthenticationGuard]
  },
  {
    path: "checkout", component: CheckoutComponent, resolve: {
      products: ProductsResolver
    }, canActivate: [AuthenticationGuard]
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
