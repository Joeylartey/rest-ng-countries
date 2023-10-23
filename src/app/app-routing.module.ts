import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesResolverService } from './services/countries-resolver.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home-page/home-page.component').then(c => c.HomePageComponent),
    resolve: [CountriesResolverService],
    title: 'Countries'
  },
  {
    path: 'details/:country',
    loadComponent: () => import('./components/detail-page/detail-page.component').then(c => c.DetailPageComponent),
    resolve: [CountriesResolverService],
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
