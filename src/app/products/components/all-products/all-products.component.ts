import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent{
  products:any[] =[];
  categories:any[] =[];
  loading:boolean = false;
  cartProducts: any[]=[];
  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading=true;
    this.service.getAllProducts().subscribe((result: any) =>
     {this.products = result, this.loading=false;});

  }

  getCategories() {
    this.loading=true;
    this.service.getAllCategories().subscribe((result: any) =>
     {this.categories = result, this.loading=false;});
   ;
  }

  filterCategory(event:any) {
    let value = event.target.value;
    (value == "All") ? this.getProducts() : this.getProductsCategory(value);

  }

  getProductsCategory (keyword: string) {
    this.loading=true;
    this.service.getProductsByCategories(keyword).subscribe((result: any) =>
    {this.loading=false;
      this.products = result})
  }

  addToCart(event:any) {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if (exist) {
        alert("Item is already on your cart")
      } else{
        this.cartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
      }
    } else{
      this.cartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    }
  }
}
