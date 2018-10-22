import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientsMapsComponent} from './clients-maps.component';

const routes: Routes = [
  { path: '', component: ClientsMapsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientsMapRouting { }
