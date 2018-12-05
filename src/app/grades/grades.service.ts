import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { GradeModel } from './grade.model';

const BACKEND_URL = environment.apiUrl + '/grades/';

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  private grades: GradeModel[] = [];
  private gradesUpdated = new Subject< GradeModel[] >();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getGrades() {
    this.http
      .get<{ message: string; grades: any }>(BACKEND_URL)
      .pipe(
        map(gradeData => {
          return gradeData.grades.map(grade => {
            return {
              gradeNumber: grade.gradeName,
              gradeLiter: grade.gradeDepartment,
              id: grade._id
            };
          });
        })
      )
      .subscribe(transformedGrades => {
        this.grades = transformedGrades;
        this.gradesUpdated.next([...this.grades]);
      });
  }

  getGradeUpdateListener() {
    return this.gradesUpdated.asObservable();
  }

  getGrade(id: string) {
    return this.http.get<{ _id: string; gradeNumber: number; gradeLiter: string }>(
      BACKEND_URL + id
    );
  }

  addGrade(gradeNumber: number, gradeLiter: string) {
    const grade: GradeModel = {
      id: null,
      gradeNumber: gradeNumber,
      gradeLiter: gradeLiter
    };
    this.http
      .post<{ message: string; gradeId: string }>(
        BACKEND_URL,
        grade
      )
      .subscribe(responseData => {
        this.router.navigate(['/grades/list']);
      });
  }

  updateGrade(id: string, gradeNumber: number, gradeLiter: string) {
    const grade: GradeModel = {
      id: id,
      gradeNumber: gradeNumber,
      gradeLiter: gradeLiter
    };
    this.http
      .put(BACKEND_URL + id, grade)
      .subscribe(response => {
        const updatedGrades = [...this.grades];
        const oldGradeIndex = updatedGrades.findIndex(p => p.id === grade.id);
        updatedGrades[oldGradeIndex] = grade;
        this.grades = updatedGrades;
        this.gradesUpdated.next([...this.grades]);
        this.router.navigate(['/grades/list']);
      });
  }

  deleteGrade(gradeId: string) {
    this.http
      .delete(BACKEND_URL + gradeId)
      .subscribe(() => {
        const updatedGrades = this.grades.filter(grade => grade.id !== gradeId);
        this.grades = updatedGrades;
        this.gradesUpdated.next([...this.grades]);
      });
  }
}
