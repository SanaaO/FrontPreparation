import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
const TOKEN_KEY = 'AuthToken';
const USER_KEY = 'id';
const AUTHORITIES_KEY = 'AuthAuthorities';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];

  private subjects: Map<string, BehaviorSubject<any>>;

  constructor() {
    this.subjects = new Map<string, BehaviorSubject<any>>();
  }
  signOut() {
    window.sessionStorage.clear();
  }


  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    if (!this.subjects.has(TOKEN_KEY)) {
      this.subjects.set(TOKEN_KEY, new BehaviorSubject<any>(token));
    } else {
      this.subjects.get(TOKEN_KEY)?.next(token);
    }
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || '{}';
  }

  public saveUserid(userid: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, userid);

  }

  public getUserid(): string {
    return sessionStorage.getItem(USER_KEY) || '{}';
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));

  }
  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY) || '{}').forEach((authority: { authority: string; }) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }


  // trigger changes on session storage
  watch(): Observable<any> {
    if (!this.subjects.has(TOKEN_KEY)) {
      this.subjects.set(TOKEN_KEY, new BehaviorSubject<any>(null));
    }
    var item = sessionStorage.getItem(TOKEN_KEY);
    if (typeof (item) === undefined || item === null) {
      item = null;
    }

    this.subjects.get(TOKEN_KEY)?.next(item);
    return this.subjects.get(TOKEN_KEY) as Observable<any>;

  }
}
