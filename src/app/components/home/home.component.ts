import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';
import { ClarityIcons, heartIcon, shoppingBagIcon } from '@cds/core/icon';
import { Subscription } from 'rxjs';
ClarityIcons.addIcons(heartIcon, shoppingBagIcon);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{

  products: Product[] = [];

  Images!: File[];
  base64Data: any;

  singleProductModalOpen = false;
  selectedProduct !: Product;

  subscription!: Subscription;

  @Output() sendProduct = new EventEmitter;

  constructor(private productservice: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productservice.getAllProducts().subscribe((data) => {

      // Response contain List of products and List of files
      //each file is relative to the product in the same index order

      this.products = data[0];
      this.Images = data[1];

      for (let i = 0; i < this.products.length; i++) {

        //iterate through Products and files lists and assign each file to its correspondent product       
        this.base64Data = this.Images[i];
        this.products[i].image = 'data:image/jpeg;base64,' + this.base64Data
      }

    },
    error => {
      console.log("Error message : " + error.error);
    });

  }

  navigate(product: Product) {

    this.singleProductModalOpen = true;
    this.selectedProduct = product;

    this.sendProduct.emit(this.selectedProduct);
  }

  handelCancel() {
    this.singleProductModalOpen = false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    console.log("test")
  }

}
