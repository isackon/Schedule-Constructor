import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeacherModel } from '../teacher.model';
import { TeachersService } from '../teachers.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SubjectModel } from 'src/app/subjects/subject.model';
import { SubjectsService } from 'src/app/subjects/subjects.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit, OnDestroy {
  teachers: TeacherModel[] = [];
  subjects: SubjectModel[] = [];
  isLoading = false;
  private authStatusSub: Subscription;
  private teachersSub: Subscription;
  private subjectsSub: Subscription;

  constructor(
    public subjectsService: SubjectsService,
    public teachersService: TeachersService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.isLoading = true;
    this.teachersService.getTeachers();
    this.subjectsService.getSubjects();
    // this.userId = this.authService.getUserId();
    this.teachersSub = this.teachersService
      .getTeacherUpdateListener()
      .subscribe(( teachers: TeacherModel[] ) => {
        this.isLoading = false;
        this.teachers = teachers;
      });
      // this.userId = this.authService.getUserId();
      this.subjectsSub = this.subjectsService
        .getSubjectUpdateListener()
        .subscribe(( subjects: SubjectModel[] ) => {
          this.isLoading = false;
          this.subjects = subjects;
        });
      // this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(authStatus => {
          this.isLoading = false;
        });
  }

  onDelete(teacherId: string) {
    this.teachersService.deleteTeacher(teacherId);
  }

  ngOnDestroy() {
    this.teachersSub.unsubscribe();
    this.subjectsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
