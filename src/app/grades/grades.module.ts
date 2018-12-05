import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { GradeCreateComponent } from './grade-create/grade-create.component';
import { GradesListComponent } from './grades-list/grades-list.component';

@NgModule({
  declarations: [GradeCreateComponent, GradesListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class GradesModule {}
