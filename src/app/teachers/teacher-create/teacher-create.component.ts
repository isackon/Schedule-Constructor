import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { TeacherModel } from '../teacher.model';
import { AuthService } from '../../auth/auth.service';
import { TeachersService } from '../teachers.service';
import { SubjectModel } from 'src/app/subjects/subject.model';
import { SubjectsService } from 'src/app/subjects/subjects.service';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})
export class TeacherCreateComponent implements OnInit, OnDestroy {
  teacher: TeacherModel;
  isLoading = false;
  form: FormGroup;
  subjects: SubjectModel[] = [];
  // private teacherId: string;
  private authStatusSub: Subscription;
  private subjectsSub: Subscription;


  constructor(
    public subjectsService: SubjectsService,
    public teachersService: TeachersService,
    public route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      teacherName: new FormControl(null, {
        validators: [Validators.required]
      }),
      teacherDepartment: new FormControl(null, {
        validators: [Validators.required]
      }),
    });

    this.subjectsService.getSubjects();
    this.subjectsSub = this.subjectsService
    .getSubjectUpdateListener()
    .subscribe(( subjects: SubjectModel[] ) => {
      this.isLoading = false;
      this.subjects = subjects;
    });
  }

  onSaveTeacher() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.teachersService.addTeacher(this.form.value.teacherName, this.form.value.teacherDepartment);
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.subjectsSub.unsubscribe();
  }

}
