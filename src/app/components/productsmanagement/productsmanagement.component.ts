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

  //to be edited or deleted
  selectedProduct: any;

  //open and close add-edit modal (addoredit component)
  productModalOpen = false;

  //open and close delete modal (deleteitem component)
  deleteProductModalOpen = false;



  constructor(private productservice: ProductService) { }

  ngOnInit(): void {
    this.productservice.getAllProducts().subscribe((data) => {

      // Response contain List of products and List of files
      //each file is relative to the product in the same index order

      this.products = data[0];
      this.Images = data[1];

      //iterate through Products and files lists and assign each file to its correspondent product
      for (let i = 0; i < this.products.length; i++) {
        this.base64Data = this.Images[i];
        this.products[i].image = 'data:image/jpeg;base64,' + this.base64Data;
      }
    },
      error => {
        console.log("Error message : " + error.error);
      });

  }

  addnewProduct() {
    this.selectedProduct = undefined;
    this.productModalOpen = true;
  }

  onEdit(product: Product): void {

    this.productModalOpen = true;
    this.selectedProduct = product;

  }

  onDelete(product: Product): void {
    this.deleteProductModalOpen = true;
    this.selectedProduct = product;
  }

  handleCancelDelete() {
    this.deleteProductModalOpen = false;
  }

  handleConfirmDelete() {

    this.productservice.deleteProduct(this.selectedProduct.prodid).subscribe(
      (response)=> {
        //console.log(response)

        const index = this.products.findIndex(p => p.prodid == this.selectedProduct!.prodid);
        //remove element (deleted product) from products arrays
        this.products.splice(index, 1);
      },
      error => {
        console.log("Error message : " + error.error);
      });
    this.deleteProductModalOpen = false;
  }

  handleFinish(product: Product) {
    if (product) {
      if (this.selectedProduct) {
        //Edit product
        console.log(product)
        this.productservice.updateProduct(this.selectedProduct.prodid, product, product.image).subscribe(
          (data) => {
            const index = this.products.findIndex(p => p.prodid == this.selectedProduct!.prodid);
            //replace product from products arrays with the new updated product (data)
            this.products[index] = data;

          },
          error => {
            console.log("Error message : " + error.error);
          }
        )

      }

      else {
        this.productservice.addProduct(product, product.image).subscribe(
          (data) => {
            console.log(data);
            //push new created product (data) into products array
            this.products.push(data);
          },
          error => {
            console.log("Error message : " + error.error);
          })
      }
    }
    this.productModalOpen = false;
  }


}
