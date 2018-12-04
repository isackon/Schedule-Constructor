import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
// import { SubjectsComponent } from './subjects.component';
import { SubjectCreateComponent } from './subject-create/subject-create.component';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';

// import { PostCreateComponent } from "./post-create/post-create.component";
// import { PostListComponent } from "./post-list/post-list.component";
// import { AngularMaterialModule } from "../angular-material.module";

@NgModule({
  declarations: [SubjectCreateComponent, SubjectsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class SubjectsModule {}
