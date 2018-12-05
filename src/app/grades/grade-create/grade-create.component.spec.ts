import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeCreateComponent } from './grade-create.component';

describe('GradeCreateComponent', () => {
  let component: GradeCreateComponent;
  let fixture: ComponentFixture<GradeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
