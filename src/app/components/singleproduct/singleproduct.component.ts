import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/Product';

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

  constructor() { }

  ngOnInit(): void {
  }

  addToBasket() {

  }

  //emit cancel event to home component
  handelCancel() {
    this.cancel.emit();
  }

}
