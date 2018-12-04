import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SubjectsService } from '../subjects.service';
import { SubjectModel } from '../subject.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css']
})
export class SubjectCreateComponent implements OnInit, OnDestroy {
  subject: SubjectModel;
  isLoading = false;
  form: FormGroup;
  // private subjectId: string;
  private authStatusSub: Subscription;

  constructor(
    public subjectsService: SubjectsService,
    public route: ActivatedRoute,
    private authService: AuthService) { }

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
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
