import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit{
  constructor(private service: CartsService){}
  cartProducts:any[] = [];
  total:any=0;
  success:boolean=false;
  ngOnInit(): void {
    this.getCartproducts();
  }

  minusAmount(index:number){
    this.cartProducts[index].quantity--;
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  addAmount(index:number){
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  getCartproducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getCartTotal();
  }

  detectChange(){
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    this.getCartTotal();
  }

  getCartTotal(){
    this.total=0
    for(let x in this.cartProducts){
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity
    }
    this.total = Number(this.total.toFixed(2));

  }
  deleteItem(index:number){
    this.cartProducts.splice(index, 1)
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  addCart(){
    let products = this.cartProducts.map(item =>{
      return {productId:item.item.id, quantity:item.quantity};
    })

    let Model= {
      userId: 5,
      date: new Date(),
      products: products
    }

    this.service.createNewCart(Model).subscribe(res =>{
      this.success = true
    })

  }
}
