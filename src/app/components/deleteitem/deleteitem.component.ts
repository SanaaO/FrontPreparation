import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-deleteitem',
  templateUrl: './deleteitem.component.html',
  styleUrls: ['./deleteitem.component.css']
})
export class DeleteitemComponent implements OnInit {

  @Input() product !: Product ;
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }


  CancelDelete() {
    this.cancel.emit();
  }

  ConfirmDelete() {
    this.confirm.emit();
  }

}
