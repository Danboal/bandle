import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

import { TimelineModule } from './timeline/timeline.module';
import { ContributionModule } from './contribution/contribution.module';
import { RankingModule } from './ranking/ranking.module';
const routes: Routes = [
  {
    path: ':id',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimelineModule,
    ContributionModule,
    RankingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
