import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  //@Output() sendState = new EventEmitter;
  //isLoggedIn = false ;

  constructor(private tokenservice: TokenStorageService, private router: Router ) { }

  ngOnInit(): void {
    this.tokenservice.signOut();
    //this.sendState.emit (this.isLoggedIn);
    //this.router.navigate(['/login'])
    
  }

}
