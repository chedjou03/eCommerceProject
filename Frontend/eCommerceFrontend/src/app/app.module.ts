import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './services/product.service';
import {Routes,RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


const routes : Routes =[
  {path : 'product/:id', component : ProductDetailComponent},
  {path : 'category/:id/:categoryName', component : ProductListComponent},
  {path : 'category', component : ProductListComponent},
  {path : 'search/:keyword', component : ProductListComponent},
  {path : 'products', component : ProductListComponent},
  {path : '', redirectTo : '/products', pathMatch : 'full'},
  {path : '**', redirectTo : '/products', pathMatch : 'full'},
];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
