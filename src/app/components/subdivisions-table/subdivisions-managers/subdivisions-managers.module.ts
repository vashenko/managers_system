import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubdivisionsManagersComponent} from './subdivisions-managers.component';
import {MaterialModule} from '../../../modules/shared/material.module.';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    SubdivisionsManagersComponent
  ],
  exports: [
    SubdivisionsManagersComponent
  ]
})

export class SubdivisionsManagersModule { }
