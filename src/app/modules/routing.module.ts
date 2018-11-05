import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from '../components/sign-in/sign-in.component';
import {GraphicsComponent} from '../components/graphics/graphics.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'log-in'
  },
  {
    path: 'log-in', component: SignInComponent
  },
  {
    path: 'graphics', component: GraphicsComponent
  },
  {
    path: 'subdivisions',
    loadChildren: '../components/subdivisions-table/subdivisions-list/subdivisions-list.module#SubdivisionsListModule',
    data: { preload: true}
  },
  {
    path: 'map',
    loadChildren: '../components/google-map/clients-maps/clients-maps.module#ClientsMapsModule'
  },
  {
    path: 'map/:address/:id',
    loadChildren: '../components/google-map/clients-maps/clients-maps.module#ClientsMapsModule'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
