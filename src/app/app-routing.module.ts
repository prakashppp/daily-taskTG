import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginGuard } from './Guards/login.guard';
import { AuthGuard } from './Guards/auth.guard';
import { Auth2Guard } from './Guards/auth2.guard';
import { PagenotfoundComponent } from './pages/components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home.module').then((m) => m.HomeModule),
    canActivate: [Auth2Guard],
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
