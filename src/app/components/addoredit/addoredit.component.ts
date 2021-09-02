import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/model/Category';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
  styleUrls: ['./addoredit.component.css']
})
export class AddoreditComponent implements OnInit, OnChanges {

  size = "lg";
  productForm!: FormGroup;
  category: Category[] = [];

  //product !: Product;
  file!: File;
  @Output() finish = new EventEmitter;
  @Input() product!: Product;

  constructor(private productservice: ProductService, private formbuilder: FormBuilder) {

    this.productForm = formbuilder.group({
      productInfos: formbuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        size: ['', Validators.required],
        price: ['', Validators.required],
        instock: ['', Validators.required],
        category: ['', Validators.required],
      }),
      illustration: formbuilder.group({
        image: ['', Validators.required],
      })

    })
  }

  ngOnInit(): void {
    this.productservice.getCategories().subscribe((data) => {
      this.category = data;
      console.log(this.category);
    });
  }

  ngOnChanges(): void {
    //si le produit est defini c'est qu'on veut modifier le produit
    if (this.product) {
      this.updateForm(this.product);
    }
  }

  updateForm(product: Product) {
    // recuperer les champs a travers patchvalue
    this.productForm.patchValue({
      productInfos: {
        category: this.product.category.name,
        name: this.product.name,
        description: this.product.description,
        size: this.product.size,
        price: this.product.price,
        instock: this.product.instock,
      }
    });
  }
  detecteFiles(event: any) {
    this.file = event.target.files[0];
  }

  //to enable and disable next button
  get isProductInfosInvalid(): boolean {
    return this.productForm.get('productInfos')!.invalid;
  }

  //to enable and disable finish button
  get isIllustration(): boolean {
    //if (this.product) { return false; }
    return this.productForm.get('illustration')!.invalid;

  }

  close() {
    this.productForm.reset();
  }





  handleCancel() {
    this.finish.emit();
    this.close;
  }

  handleFinish() {
    const product = {
      ...this.productForm.get('productInfos')!.value,
      ...this.productForm.get('illustration')!.value,
    }

    if (this.file) {
      product.image = this.file;
    }
    console.log("event : " +JSON.stringify(product));
    this.finish.emit(product);
   
    this.close();

  }


}
