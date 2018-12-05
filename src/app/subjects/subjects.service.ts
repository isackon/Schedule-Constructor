import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { SubjectModel } from './subject.model';

const BACKEND_URL = environment.apiUrl + '/subjects/';


@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private subjects: SubjectModel[] = [];
  private subjectsUpdated = new Subject< SubjectModel[] >();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getSubjects() {
    this.http
      .get<{ message: string; subjects: any }>(BACKEND_URL)
      .pipe(
        map(subjectData => {
          return subjectData.subjects.map(subject => {
            return {
              subjectName: subject.subjectName,
              id: subject._id
            };
          });
        })
      )
      .subscribe(transformedSubjects => {
        this.subjects = transformedSubjects;
        this.subjectsUpdated.next([...this.subjects]);
      });
  }

  getSubjectUpdateListener() {
    return this.subjectsUpdated.asObservable();
  }

  getSubject(id: string) {
    return this.http.get<{ _id: string; subjectName: string }>(
      BACKEND_URL + id
    );
  }

  addSubject(subjectName: string) {
    const subject: SubjectModel = { id: null, subjectName: subjectName };
    this.http
      .post<{ message: string; subjectId: string }>(
        BACKEND_URL,
        subject
      )
      .subscribe(responseData => {
        // const id = responseData.subjectId;
        // subject.id = id;
        // this.subjects.push(subject);
        // this.subjectsUpdated.next([...this.subjects]);
        this.router.navigate(['/subjects/list']);
      });
  }

  updateSubject(id: string, subjectName: string) {
    const subject: SubjectModel = { id: id, subjectName: subjectName };
    this.http
      .put(BACKEND_URL + id, subject)
      .subscribe(response => {
        const updatedSubjects = [...this.subjects];
        const oldSubjectIndex = updatedSubjects.findIndex(p => p.id === subject.id);
        updatedSubjects[oldSubjectIndex] = subject;
        this.subjects = updatedSubjects;
        this.subjectsUpdated.next([...this.subjects]);
        this.router.navigate(['/subjects/list']);
      });
  }

  deleteSubject(subjectId: string) {
    this.http
      .delete(BACKEND_URL + subjectId)
      .subscribe(() => {
        const updatedSubjects = this.subjects.filter(subject => subject.id !== subjectId);
        this.subjects = updatedSubjects;
        this.subjectsUpdated.next([...this.subjects]);
      });
  }

}
