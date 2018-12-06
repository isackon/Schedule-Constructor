import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PostListComponent } from "./posts/post-list/post-list.component";
// import { PostCreateComponent } from "./posts/post-create/post-create.component";
// import { AuthGuard } from "./auth/auth.guard";
import { SubjectCreateComponent } from './subjects/subject-create/subject-create.component';
import { SubjectsListComponent } from './subjects/subjects-list/subjects-list.component';
import { TeacherCreateComponent } from './teachers/teacher-create/teacher-create.component';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { GradeCreateComponent } from './grades/grade-create/grade-create.component';
import { GradesListComponent } from './grades/grades-list/grades-list.component';
import { AuthGuard } from './auth/auth.guard';
import { ScheduleCreateComponent } from './grades/schedule-create/schedule-create.component';
import { ScheduleComponent } from './grades/schedule/schedule.component';

const routes: Routes = [
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'subjects/create', component: SubjectCreateComponent, canActivate: [AuthGuard] },
  { path: 'subjects/edit/:subjectId', component: SubjectCreateComponent, canActivate: [AuthGuard] },
  { path: 'subjects/list', component: SubjectsListComponent, canActivate: [AuthGuard] },
  { path: 'teachers/create', component: TeacherCreateComponent, canActivate: [AuthGuard] },
  { path: 'teachers/edit/:teacherId', component: TeacherCreateComponent, canActivate: [AuthGuard] },
  { path: 'teachers/list', component: TeachersListComponent, canActivate: [AuthGuard] },
  { path: 'grades/create', component: GradeCreateComponent, canActivate: [AuthGuard] },
  { path: 'grades/edit/:gradeId', component: GradeCreateComponent, canActivate: [AuthGuard] },
  { path: 'grades/list', component: GradesListComponent},
  { path: 'schedule/create/:gradeId', component: ScheduleCreateComponent, canActivate: [AuthGuard] },
  { path: 'schedule/:gradeId', component: ScheduleComponent},

  // { path: "create", component: PostCreateComponent, canActivate: [AuthGuard] },
  // { path: "edit/:postId", component: PostCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
