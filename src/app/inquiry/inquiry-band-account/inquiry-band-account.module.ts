import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgCalendarModule  } from 'ionic2-calendar'
import { InquiryBandAccountPage } from './inquiry-band-account.page';

const routes: Routes = [
  {
    path: '',
    component: InquiryBandAccountPage
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
  declarations: [InquiryBandAccountPage]
})
export class InquiryBandAccountPageModule {}
