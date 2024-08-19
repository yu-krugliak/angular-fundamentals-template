import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';
import { CoursesState } from './courses.reducer';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    // Add your code here 
  isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isAllCoursesLoadingSelector)
  );
  isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isSingleCourseLoadingSelector)
  );
  isSearchingState$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isSearchingStateSelector)
  );
  courses$: Observable<any[] | null | undefined> = this.store.pipe(
    select(CoursesSelectors.getAllCourses)
  );
  allCourses$: Observable<any[] | null | undefined> = this.store.pipe(
    select(CoursesSelectors.getAllCourses)
  );
  course$: Observable<any | undefined> = this.store.pipe(
    select(CoursesSelectors.getCourse)
  );
  errorMessage$: Observable<string | null> = this.store.pipe(
    select(CoursesSelectors.getErrorMessage)
  );

  constructor(private store: Store<CoursesState>) {}

  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
  }

  editCourse(course: any, id: string): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ course, id }));
  }

  createCourse(course: any): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}