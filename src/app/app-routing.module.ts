import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {HomeComponent} from "./layouts/home/home.component";
import {ProfileEditComponent} from "./components/profile/profile-edit/profile-edit.component";
import {MainComponent} from "./components/main/main.component";
import {LogoutGuard} from "./guards/logout.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    canActivate: [LogoutGuard],
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'profile/edit',
        component: ProfileEditComponent
      },
      {
        path: 'profile/:username',
        component: ProfileComponent
      },
      {
        path: '',
        component: MainComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
