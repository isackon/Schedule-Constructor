import { Component, OnInit, OnDestroy } from '@angular/core';
import { GradeModel } from '../grade.model';
import { GradesService } from '../grades.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.css']
})
export class GradesListComponent implements OnInit, OnDestroy {
  grades: GradeModel[] = [];
  isLoading = false;
  private authStatusSub: Subscription;
  private gradesSub: Subscription;

  constructor(
    public gradesService: GradesService,
    private authService: AuthService
    ) { }

    ngOnInit() {
      this.isLoading = true;
      this.gradesService.getGrades();
      // this.userId = this.authService.getUserId();
      this.gradesSub = this.gradesService
        .getGradeUpdateListener()
        .subscribe(( grades: GradeModel[] ) => {
          this.isLoading = false;
          this.grades = grades;
        });
        // this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService
          .getAuthStatusListener()
          .subscribe(authStatus => {
            this.isLoading = false;
          });
    }

    onDelete(gradeId: string) {
      this.gradesService.deleteGrade(gradeId);
    }

    ngOnDestroy() {
      this.gradesSub.unsubscribe();
      this.authStatusSub.unsubscribe();
    }
}
