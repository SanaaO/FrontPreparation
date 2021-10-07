import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../model/Product';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private url = environment.apiServer;
  constructor(private http: HttpClient) { }


  getAllProducts() : Observable<any>{
    return this.http.get(this.url + '/api/products/getProducts');
  }

  addProduct(prod : Product, file: any) : Observable<any>{

    console.log("service : " +JSON.stringify(prod));
    const product = new Blob([JSON.stringify(prod)], {
      type: 'application/json',
    });

    let params = new FormData();
    params.append('productF', product);
    params.append('file', file);
    return this.http.post(this.url + '/api/products/addproduct', params)

  }

  
  updateProduct(id : any, prod: Product, file: any) : Observable<any> {

    const product = new Blob([JSON.stringify(prod)], {
      type: 'application/json',
    });

    let params = new FormData();
    params.append('productF', product);
    params.append('file', file);

    return this.http.put(this.url + '/api/products/update?id=' + id, params)

  }

  deleteProduct(idprod : number) {
    return this.http.delete(this.url + '/api/products/delete?id=' + idprod, { responseType: 'text' })
  }

  getCategories() : Observable<any>{
    return this.http.get(this.url + '/api/products/getCategories');
  }

  getCategory(name : String) : Observable<any>{
    return this.http.get(this.url + '/api/products/getCategory?name='+name);
  }

}
