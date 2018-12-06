import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { GradeCreateComponent } from './grade-create/grade-create.component';
import { GradesListComponent } from './grades-list/grades-list.component';
import { ScheduleCreateComponent } from './schedule-create/schedule-create.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [GradeCreateComponent, GradesListComponent, ScheduleCreateComponent, ScheduleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class GradesModule {}
