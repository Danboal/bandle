import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SchedulePage } from './schedule.page';
import { NgCalendarModule  } from 'ionic2-calendar'
import { EventModule } from './event/event.module';
const routes: Routes = [
  {
    path: ':id',
    component: SchedulePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    EventModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SchedulePage],
})
export class SchedulePageModule {}
