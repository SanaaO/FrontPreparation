import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';
import { ClarityIcons, trashIcon } from '@cds/core/icon';
ClarityIcons.addIcons(trashIcon);
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  wishList: Product[] = [];
  subscription!: Subscription;
  selectedProduct !: Product;

  productAvailibility !: string;

  Images!: File[];
  base64Data: any;

  userID  !: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.userID = sessionStorage.getItem('userID');

    this.subscription = this.productService.getWishList(this.userID).subscribe((data) => {



      this.wishList = data[0];
      this.Images = data[1];

      for (let i = 0; i < this.wishList.length; i++) {

        //iterate through Products and files lists and assign each file to its correspondent product       
        this.base64Data = this.Images[i];
        this.wishList[i].image = 'data:image/jpeg;base64,' + this.base64Data
        if (this.wishList[i].instock > 0) { this.productAvailibility = "In Stock" }
        else { this.productAvailibility = "Sold Out" }
      }

    },
      error => {
        console.log("Error message : " + error);
      });
  }

  removeItem(product: Product) {
    this.productService.updateWishList(product.prodid, this.userID).subscribe(
      (data) => {
        console.log(data)
        const index = this.wishList.findIndex(p => p.prodid == product!.prodid);
        this.wishList.splice(index, 1);
      })
  }

}
