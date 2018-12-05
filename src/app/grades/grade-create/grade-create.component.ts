import { Component, OnInit, OnDestroy } from '@angular/core';
import { GradeModel } from '../grade.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { GradesService } from '../grades.service';

export interface Number {
  number: number;
}
export interface Liter {
  liter: string;
}

@Component({
  selector: 'app-grade-create',
  templateUrl: './grade-create.component.html',
  styleUrls: ['./grade-create.component.css']
})
export class GradeCreateComponent implements OnInit, OnDestroy {
  numbers: Number[] = [
    {number: 7},
    {number: 8},
    {number: 9},
    {number: 10},
    {number: 11},
    {number: 12},
  ];
  liters: Liter[] = [
    {liter: 'A'},
    {liter: 'B'},
    {liter: 'C'},
    {liter: 'D'},
    {liter: 'E'},
    {liter: 'F'},
    {liter: 'G'},
    {liter: 'H'},
    {liter: 'I'},
  ];
  grade: GradeModel;
  isLoading = false;
  form: FormGroup;
  // subjects: SubjectModel[] = [];
  // private gradeId: string;
  private authStatusSub: Subscription;
  // private subjectsSub: Subscription;
  private mode;
  private gradeId: string;

  constructor(
    public gradesService: GradesService,
    public route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });

    this.form = new FormGroup({
      gradeNumber: new FormControl(null, {
        validators: [Validators.required]
      }),
      gradeLiter: new FormControl(null, {
        validators: [Validators.required]
      }),
    });



    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('gradeId')) {
        this.mode = 'edit';
        this.gradeId = paramMap.get('gradeId');
        this.isLoading = true;
        this.gradesService.getGrade(this.gradeId).subscribe(gradeData => {
          this.isLoading = false;
          this.grade = {
            id: gradeData._id,
            gradeNumber: gradeData.gradeNumber,
            gradeLiter: gradeData.gradeLiter,
          };
          this.form.setValue({
            gradeNumber: this.grade.gradeNumber,
            gradeLiter: this.grade.gradeLiter
          });
        });
      } else {
        this.mode = 'create';
        this.gradeId = null;
      }
    });
  }

  onSaveGrade() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
        this.gradesService.addGrade(
          this.form.value.gradeNumber,
          this.form.value.gradeLiter
      );
    } else {
      this.gradesService.updateGrade(
        this.gradeId,
        this.form.value.gradeNumber,
        this.form.value.gradeLiter
      );
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
