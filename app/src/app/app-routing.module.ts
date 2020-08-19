import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './services/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';

const childrenRoutes = [
  {
    path: '',
    loadChildren: () => import('./modules/item-list/item-list.module').then(m => m.ItemListModule),
    canActivate: [AuthGuard],
  },
];
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login-page/login-page.module').then(m => m.LoginPageModule),
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: childrenRoutes,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
