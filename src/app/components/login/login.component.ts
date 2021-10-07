import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/model/login';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  size = "lg";
  loginForm !: FormGroup;
  login !: Login;
  isLoggedIn !: Boolean;



  constructor(private formbuilder: FormBuilder, private authenicationservice: AuthenticationService,
    private router: Router, private tokenservice: TokenStorageService,) {
    this.loginForm = formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }


  Connection(loginForm: FormGroup) {

    this.login = new Login(this.loginForm.value.username,
      this.loginForm.value.password);

    this.authenicationservice.login(this.login).subscribe((response) => {
      //console.log(response);
      this.tokenservice.saveToken(response.token);
      this.tokenservice.saveAuthorities(response.authorities);
      this.tokenservice.saveUserid(response.userid);
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    },
    error => {
      console.log("Error message : " + error.error);
    })

  }

 
}
