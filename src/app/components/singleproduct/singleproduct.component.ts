import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css']
})
export class SingleproductComponent implements OnInit {
  size = "lg";

  //product from home component
  @Input() product!: Product;

  @Output() cancel = new EventEmitter();

  userID!: any;

  constructor(private productservice: ProductService) { }

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('userID');
  }

  addToBasket() {

  }

  addToFavorites(product: Product) {
    this.productservice.addToWishList(product, this.userID).subscribe(
      (data) => { console.log(data) }
    )
  }

  //emit cancel event to home component
  handelCancel() {
    this.cancel.emit();
  }

}
