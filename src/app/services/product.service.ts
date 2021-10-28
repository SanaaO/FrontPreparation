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


  getAllProducts(): Observable<any> {
    return this.http.get(this.url + '/api/products/getProducts');
  }

  addProduct(prod: Product, file: any): Observable<any> {

    console.log("service : " + JSON.stringify(prod));
    const product = new Blob([JSON.stringify(prod)], {
      type: 'application/json',
    });

    let params = new FormData();
    params.append('productF', product);
    params.append('file', file);
    return this.http.post(this.url + '/api/products/addproduct', params)

  }


  updateProduct(id: any, prod: Product, file: any): Observable<any> {

    const product = new Blob([JSON.stringify(prod)], {
      type: 'application/json',
    });

    let params = new FormData();
    params.append('productF', product);
    params.append('file', file);

    return this.http.put(this.url + '/api/products/update?id=' + id, params)

  }

  deleteProduct(idprod: number) {
    return this.http.delete(this.url + '/api/products/delete?id=' + idprod, { responseType: 'text' })
  }



  /* wishlist */

  addToWishList(prroduct: Product, userID: number) {
    return this.http.post(this.url + '/api/wishList/addWishList?userID=' + userID, prroduct, { responseType: 'text' })
  }
  updateWishList(productID: number, userID: number) {
    return this.http.delete(this.url + '/api/wishList/remove?productID=' + productID + '&userID=' + userID, { responseType: 'text' })

  }

  getWishList(userID: number): Observable<any> {
    return this.http.get(this.url + '/api/wishList/getWishList?userID=' + userID)
  }


  /* Category */
  getCategory(name: String): Observable<any> {
    return this.http.get(this.url + '/api/products/getCategory?name=' + name);
  }
  getCategories(): Observable<any> {
    return this.http.get(this.url + '/api/products/getCategories');
  }
}
