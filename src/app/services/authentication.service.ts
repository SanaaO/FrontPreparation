import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../model/login';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = environment.apiServer;

  constructor(private http: HttpClient) { }


  login(login: Login): Observable<any> {
    
    return this.http.post(this.url + '/api/user/login', login );
  }

  Register (user: User): Observable<any> {
    
    return this.http.post(this.url + '/api/user/register', user );
  }

  isLoggedIn (){
    return !!sessionStorage.getItem('AuthToken');
  }


  
}
