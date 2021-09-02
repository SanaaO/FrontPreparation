import { Component, Input, OnInit } from '@angular/core';
import { codeIcon } from '@cds/core/icon';
import { Category } from 'src/app/model/Category';
import { Product } from 'src/app/model/Product';

import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-productsmanagement',
  templateUrl: './productsmanagement.component.html',
  styleUrls: ['./productsmanagement.component.css']
})
export class ProductsmanagementComponent implements OnInit {

  @Input() product!: Product;
  products: Product[] = [];
  Images!: File[];
  base64Data: any;

  selectedProduct : any;

  productModalOpen = false;


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



  handleFinish(product: Product) {
    if (product) {

      if (this.selectedProduct) {
        //Edit product
        this.productservice.updateProduct(this.selectedProduct.prodid, product, product.image).subscribe(
          (response) => {
            const index = this.products.findIndex(p => p.prodid == this.selectedProduct!.prodid);
            //this.products[index] = response;

          }
        )

      }
      else {
        console.log("avant modif : " + JSON.stringify(product))

        // const categ  = new Category( this.product.category);
        //this.product.category = categ;


        console.log("apres modif :" + JSON.stringify(product));
        console.log(product);

        this.productservice.addProduct(product, product.image).subscribe(
          (data) => {
            //console.log("done");
            this.products.push(data);
          })
      }
    }
  }

  addnewProduct() {
    this.selectedProduct = undefined;
    this.productModalOpen = true;
  }

  onEdit(product: Product): void {
    this.productModalOpen = true;
    this.selectedProduct = product;
    //console.log(this.selectedProduct)
  }

}
