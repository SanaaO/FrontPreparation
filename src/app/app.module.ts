import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { ClarityModule } from '@clr/angular';

import { AuthInterceptor } from './services/auth-interceptor';
import { ProductService } from './services/product.service';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

import { RouterModule, Routes } from '@angular/router';
import { ProductsmanagementComponent } from './components/productsmanagement/productsmanagement.component';
import { AddoreditComponent } from './components/addoredit/addoredit.component';
import { DeleteitemComponent } from './components/deleteitem/deleteitem.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SingleproductComponent } from './components/singleproduct/singleproduct.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent  },
  { path: '', component: HomeComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: 'management', component: ProductsmanagementComponent, canActivate : [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  //path unknown
  { path: '**', redirectTo: 'notFound' },]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    NotfoundComponent,
    ProductsmanagementComponent,
    AddoreditComponent,
    DeleteitemComponent,
    LogoutComponent,
    SingleproductComponent

  ],
  imports: [
    BrowserModule,
    ClarityModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
