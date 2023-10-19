import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home-page/home-page.component').then(c => c.HomePageComponent),
    title: 'Where in the world?'
  },
  {
    path: 'details/:country',
    loadComponent: () => import('./components/detail-page/detail-page.component').then(c => c.DetailPageComponent),
    title: 'Details'
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found-page/not-found-page.component').then(c => c.NotFoundPageComponent),
    title: '404 - Not Found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
