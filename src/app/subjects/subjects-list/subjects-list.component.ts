import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubjectModel } from '../subject.model';
import { SubjectsService } from '../subjects.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.css']
})
export class SubjectsListComponent implements OnInit, OnDestroy {
  subjects: SubjectModel[] = [];
  isLoading = false;
  private authStatusSub: Subscription;
  private subjectsSub: Subscription;

  constructor(
    public subjectsService: SubjectsService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.isLoading = true;
    this.subjectsService.getSubjects();
    // this.userId = this.authService.getUserId();
    this.subjectsSub = this.subjectsService
      .getSubjectUpdateListener()
      .subscribe(( subjects: SubjectModel[] ) => {
        this.isLoading = false;
        this.subjects = subjects;
      });
      // this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(authStatus => {
          this.isLoading = false;
        });
  }

  onDelete(subjectId: string) {
    this.subjectsService.deleteSubject(subjectId);
  }

  ngOnDestroy() {
    this.subjectsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
