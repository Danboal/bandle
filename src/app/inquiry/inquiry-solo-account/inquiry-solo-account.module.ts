import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NgCalendarModule  } from 'ionic2-calendar'
import { InquirySoloAccountPage } from './inquiry-solo-account.page';

const routes: Routes = [
  {
    path: '',
    component: InquirySoloAccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InquirySoloAccountPage]
})
export class InquirySoloAccountPageModule {}
