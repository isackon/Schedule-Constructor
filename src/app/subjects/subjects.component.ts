import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { SubjectsService } from './subjects.service';
import { SubjectModel } from './subject.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, OnDestroy {
  enteredSubjectName = '';
  // enteredContent = "";
  subject: SubjectModel;
  isLoading = false;
  form: FormGroup;
  private mode = 'create';
  private subjectId: string;
  private authStatusSub: Subscription;
  private postId = null;

  constructor(
    public subjectsService: SubjectsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      subjectName: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onSaveSubject() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.subjectsService.addSubject(this.form.value.subjectName);
    // this.subjectsService.addSubject(
    //   this.form.value.subjectName
    // );
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
