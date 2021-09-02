import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';
import { ClarityIcons, heartIcon, shoppingBagIcon } from '@cds/core/icon';
ClarityIcons.addIcons(heartIcon, shoppingBagIcon);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  Images!: File[];
  base64Data: any;

  productDetails = false;
  selectedProduct !: Product;

  @Output() sendProduct = new EventEmitter;

  constructor(private productservice: ProductService) { }

  ngOnInit(): void {
    this.productservice.getAllProducts().subscribe((data) => {

      console.log("get : " + JSON.stringify(data[0][1]));
      this.products = data[0];
      this.Images = data[1];

      for (let i = 0; i < this.products.length; i++) {
        this.base64Data = this.Images[i];
        this.products[i].image = 'data:image/jpeg;base64,' + this.base64Data;
      }
    });

  }

  navigate(product : Product) {

    console.log("ok")
    //this.router.navigate(["/single-product"]);
    this.productDetails = true;
    this.selectedProduct = product;
    //console.log(this.selectedProduct);
    this.sendProduct.emit(this.selectedProduct);

  }

  handelCancel(){
    this.productDetails = false ;
  }

}
