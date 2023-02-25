import { HomePageComponent } from './components/home-page/home-page.component';
import { RegistrationListComponent } from './components/registration-list/registration-list.component';
import { CreateRegistrationComponent } from './components/create-registration/create-registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'register', component:CreateRegistrationComponent},
  {path: 'list', component:RegistrationListComponent},
  {path: 'detail/:id', component:UserDetailComponent},
  {path: 'update/:id', component:CreateRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
