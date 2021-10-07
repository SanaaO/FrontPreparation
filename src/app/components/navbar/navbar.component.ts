import { Component, OnInit } from '@angular/core';
import { ClarityIcons, userIcon, homeIcon, crownIcon, cogIcon, storeIcon, loginIcon } from '@cds/core/icon';
import { TokenStorageService } from 'src/app/services/token-storage.service';



ClarityIcons.addIcons(userIcon, homeIcon, crownIcon, cogIcon, loginIcon);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isLoggedIn!: Boolean;
  isAdministrator !: Boolean;
  constructor(private tokenservice: TokenStorageService) {
  }

  ngOnInit() {

    //watch for changes in session storage
    this.tokenservice.watch().pipe().subscribe(data => {

      if (sessionStorage.getItem('AuthToken') != null) {
        this.isLoggedIn = true;
        this.isAdministrator = true;

        /*if (this.tokenservice.getAuthorities()[0] === 'Administrator') {
          this.isAdministrator = true;
          console.log(this.tokenservice.getAuthorities()[0])
          console.log(this.isAdministrator)
        }*/

      }
      else {
        this.isLoggedIn = false;
      }
    });

  }

  logout() {
    this.tokenservice.signOut();
    this.isLoggedIn = false;
    this.isAdministrator = false;
  }

}

