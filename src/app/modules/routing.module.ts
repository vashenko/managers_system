import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GraphicsComponent} from '../components/graphics/graphics.component';
import {SignInComponent} from '../components/sign-in/sign-in.component';
import {ClientsMapsComponent} from '../components/google-map/clients-maps/clients-maps.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SignInComponent},
  { path: 'log-in', component: SignInComponent},
  { path: 'graphics', component: GraphicsComponent},
  { path: 'subdivisions',
    loadChildren: '../components/subdivisions-table/subdivisions-list/subdivisions-list.module#SubdivisionsListModule'},
  { path: 'map', component: ClientsMapsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
