import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  private authStatusSub: Subscription;
  private mode;
  private subjectId: string;

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


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('subjectId')) {
        this.mode = 'edit';
        this.subjectId = paramMap.get('subjectId');
        this.isLoading = true;
        this.subjectsService.getSubject(this.subjectId).subscribe(subjectData => {
          this.isLoading = false;
          this.subject = {
            id: subjectData._id,
            subjectName: subjectData.subjectName
          };
          this.form.setValue({
            subjectName: this.subject.subjectName
          });
        });
      } else {
        this.mode = 'create';
        this.subjectId = null;
      }
    });
  }

  onSaveSubject() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.subjectsService.addSubject(
        this.form.value.subjectName
      );
    } else {
      this.subjectsService.updateSubject(
        this.subjectId,
        this.form.value.subjectName,
      );
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
