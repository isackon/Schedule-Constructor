import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { TeacherModel } from './teacher.model';

const BACKEND_URL = environment.apiUrl + '/teachers/';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private teachers: TeacherModel[] = [];
  private teachersUpdated = new Subject< TeacherModel[] >();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getTeachers() {
    this.http
      .get<{ message: string; teachers: any }>(BACKEND_URL)
      .pipe(
        map(teacherData => {
          return teacherData.teachers.map(teacher => {
            return {
              teacherName: teacher.teacherName,
              teacherDepartment: teacher.teacherDepartment,
              id: teacher._id
            };
          });
        })
      )
      .subscribe(transformedTeachers => {
        this.teachers = transformedTeachers;
        this.teachersUpdated.next([...this.teachers]);
      });
  }

  getTeacherUpdateListener() {
    return this.teachersUpdated.asObservable();
  }

  getTeacher(id: string) {
    return this.http.get<{ _id: string; teacherName: string; teacherDepartment: string }>(
      BACKEND_URL + id
    );
  }

  addTeacher(teacherName: string, teacherDepartment: string) {
    const teacher: TeacherModel = {
      id: null,
      teacherName: teacherName,
      teacherDepartment: teacherDepartment
    };
    this.http
      .post<{ message: string; teacherId: string }>(
        BACKEND_URL,
        teacher
      )
      .subscribe(responseData => {
        this.router.navigate(['/teachers/list']);
      });
  }

  updateTeacher(id: string, teacherName: string, teacherDepartment: string) {
    const teacher: TeacherModel = {
      id: id,
      teacherName: teacherName,
      teacherDepartment: teacherDepartment
    };
    this.http
      .put(BACKEND_URL + id, teacher)
      .subscribe(response => {
        const updatedTeachers = [...this.teachers];
        const oldTeacherIndex = updatedTeachers.findIndex(p => p.id === teacher.id);
        updatedTeachers[oldTeacherIndex] = teacher;
        this.teachers = updatedTeachers;
        this.teachersUpdated.next([...this.teachers]);
        this.router.navigate(['/']);
      });
  }

  deleteTeacher(teacherId: string) {
    this.http
      .delete(BACKEND_URL + teacherId)
      .subscribe(() => {
        const updatedTeachers = this.teachers.filter(teacher => teacher.id !== teacherId);
        this.teachers = updatedTeachers;
        this.teachersUpdated.next([...this.teachers]);
      });
  }

}
