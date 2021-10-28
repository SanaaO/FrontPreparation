import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClarityIcons, userIcon, homeIcon, crownIcon, cogIcon, storeIcon, loginIcon, logoutIcon} from '@cds/core/icon';
import { TokenStorageService } from 'src/app/services/token-storage.service';



ClarityIcons.addIcons(userIcon, homeIcon, crownIcon, cogIcon, loginIcon,logoutIcon);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isLoggedIn!: Boolean;
  isAdministrator !: Boolean;
  constructor(private tokenservice: TokenStorageService , private router: Router) {
  }

  ngOnInit() {

    //watch for token changes in session storage
    this.tokenservice.watch('AuthToken').pipe().subscribe(data => {
      
      if (sessionStorage.getItem('AuthToken') != null) { 
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    });

    //watch for Authority changes in session storage
    this.tokenservice.watch('AuthAuthorities').pipe().subscribe(data => {

      if (this.tokenservice.getAuthorities()[0] === 'Administrator') {
        this.isAdministrator = true;
      }
      else {
        this.isAdministrator = false;
      }
    });
  }

  logout() {
    this.tokenservice.signOut();
    this.isLoggedIn = false;
    this.isAdministrator = false;
    this.router.navigate(['']);
  }

}

