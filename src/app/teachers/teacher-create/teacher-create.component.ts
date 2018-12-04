import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { TeacherModel } from '../teacher.model';
import { AuthService } from '../../auth/auth.service';
import { TeachersService } from '../teachers.service';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})
export class TeacherCreateComponent implements OnInit, OnDestroy {
  teacher: TeacherModel;
  isLoading = false;
  form: FormGroup;
  // private teacherId: string;
  private authStatusSub: Subscription;

  constructor(
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
  }

}
