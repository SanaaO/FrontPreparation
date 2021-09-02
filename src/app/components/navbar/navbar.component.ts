import { Component, OnInit } from '@angular/core';
import { ClarityIcons, userIcon, homeIcon, crownIcon, cogIcon, storeIcon, loginIcon } from '@cds/core/icon';
import { TokenStorageService } from 'src/app/services/token-storage.service';

ClarityIcons.addIcons(userIcon, homeIcon, crownIcon, cogIcon, loginIcon);

export interface RouteInfo {
  path: string;
  title: string;
}


export const ROUTES: RouteInfo[] = [
  { path: '/home', title: 'Home', },
  { path: '/management', title: 'Products Management' },

];

export const CnxROUTES: RouteInfo[] = [
  { path: '/login', title: 'Login' },
  { path: '/logout', title: 'Logout' },

];


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  public menuItems!: any[];
  public cnxmenuItems!: any[];
  constructor(private tokenservice: TokenStorageService) {console.log(this.tokenservice.getToken()) }

  isLoggedIn = false;
  ngOnInit() {

    if ((this.tokenservice.getToken()) && (this.tokenservice.getAuthorities()[0] === 'Customer')) {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.menuItems = ROUTES.filter(function (menuItem) {
        return (menuItem.title !== 'Products Management');
      });

      this.cnxmenuItems = CnxROUTES.filter(cnxmenuItems => cnxmenuItems);
      this.cnxmenuItems = CnxROUTES.filter(function (cnxmenuItems) {

        return (cnxmenuItems.title !== 'Login');

      });

      console.log(this.tokenservice.getAuthorities()[0]);
    }
    else if (this.tokenservice.getToken() && this.tokenservice.getAuthorities()[0] === 'Administrator') {
      this.menuItems = ROUTES.filter(menuItem => menuItem);

      this.cnxmenuItems = CnxROUTES.filter(cnxmenuItems => cnxmenuItems);
      this.cnxmenuItems = CnxROUTES.filter(function (cnxmenuItems) {

        return (cnxmenuItems.title !== 'Login');

      });
      console.log(this.tokenservice.getAuthorities()[0]);
    }
    else {
      this.cnxmenuItems = CnxROUTES.filter(cnxmenuItems => cnxmenuItems);
      this.cnxmenuItems = CnxROUTES.filter(function (cnxmenuItems) {

        return (cnxmenuItems.title !== 'Logout');

      });
    }
  }







}
