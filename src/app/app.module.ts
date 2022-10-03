import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {TokenInterceptorModule} from "./modules/token-interceptor/token-interceptor.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ProfileComponent } from './components/profile/profile.component';
import {AuthGuard} from "./guards/auth.guard";
import {DataService} from "./services/data.service";
import { HomeComponent } from './layouts/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TokenInterceptorModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
