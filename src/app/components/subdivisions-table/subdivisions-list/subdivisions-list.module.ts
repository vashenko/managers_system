import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubdivisionsManagersModule} from '../subdivisions-managers/subdivisions-managers.module';
import {SubdivisionsRoutingModule} from './subdivisions-routing.module';
import {MaterialModule} from '../../../modules/shared/material.module.';
import {SubdivisionsListComponent} from './subdivisions-list.component';
import {ManagerService} from '../../../services/manager.service';
import {DateService} from '../../../services/date.service';
import {SubdivisionService} from '../../../services/subdivision.service';

@NgModule({
  declarations: [
    SubdivisionsListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SubdivisionsManagersModule,
    SubdivisionsRoutingModule
  ],
  exports: [
    SubdivisionsListComponent,
    SubdivisionsManagersModule,
    SubdivisionsRoutingModule
  ],
  providers: [
    ManagerService,
    SubdivisionService,
    DateService
  ]
})

export class SubdivisionsListModule { }
