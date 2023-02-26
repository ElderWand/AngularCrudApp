import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegistrationListComponent } from './components/registration-list/registration-list.component';
import { CreateRegistrationComponent } from './components/create-registration/create-registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  {path: '', redirectTo:'homepage', pathMatch: 'full'},
  {path: 'register', component:CreateRegistrationComponent},
  {path: 'homepage', component:HomePageComponent},
  {path: 'list', component:RegistrationListComponent},
  {path: 'detail/:id', component:UserDetailComponent},
  {path: 'update/:id', component:CreateRegistrationComponent},
  {path: 'login', component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
