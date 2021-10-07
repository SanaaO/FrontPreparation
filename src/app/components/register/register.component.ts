import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  size = "lg";
  resgiterModalOpen = true;
  registerForm !: FormGroup;
  user !: User;


  constructor(private formbuilder: FormBuilder, private authenicationservice: AuthenticationService,
    private datepipe: DatePipe ,private router: Router, private tokenservice: TokenStorageService) {
    this.registerForm = formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      role: ['', Validators.required],

    })

  }

  ngOnInit(): void {
  }

  createAccount(registerForm: FormGroup) {

    this.user = new User(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.name,
      this.datepipe.transform(this.registerForm.value.birthday, 'yyyy-MM-dd')!, this.registerForm.value.role);

    this.authenicationservice.Register(this.user).subscribe(response => {
      console.log(response);
      this.tokenservice.saveToken(response.body.token);
      this.tokenservice.saveAuthorities(response.body.authorities);
      this.tokenservice.saveUserid(response.body.userid);
      this.router.navigate(['/home']);
    },
    error => {
      console.log("Error message : " + error.error);
    })
  }
}
