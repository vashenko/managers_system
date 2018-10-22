import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubdivisionsListComponent} from './subdivisions-list.component';

const routes: Routes = [
  { path: '', component: SubdivisionsListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SubdivisionsRoutingModule { }
