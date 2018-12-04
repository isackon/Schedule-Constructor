import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';

@NgModule({
  declarations: [TeacherCreateComponent, TeachersListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class TeachersModule {}
