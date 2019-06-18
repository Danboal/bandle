import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributionComponent } from './contribution.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ContributionComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[ContributionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContributionModule { }
