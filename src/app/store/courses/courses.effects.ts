import { Injectable } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import * as CoursesActions from './courses.actions';

@Injectable()
export class CoursesEffects {
 // Add your code here
    constructor(
      private actions$: Actions,
      private coursesService: CoursesService,
      private router: Router
    ) {}
  
    getAll$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() => this.coursesService.getAll()
        .pipe(
          map((courses: any[]) => CoursesActions.requestAllCoursesSuccess({ courses })),
          catchError(error => of(CoursesActions.requestAllCoursesFail({ error })))
        )
      )
    ));

    filteredCourses$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      switchMap(action => this.coursesService.getAll().pipe(
        map(courses => {
          if (!courses || courses.length === 0) {
            throw new Error('No courses available');
          }
          const filteredCourses = courses.filter((course: any) => 
            course.title.toLowerCase().includes(action.title.toLowerCase())
          );
          return CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses });
        }),
        catchError(error => of(CoursesActions.requestFilteredCoursesFail({ error: error.message || 'Unknown error' })))
      ))
    ));

    getSpecificCourse$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap(action => this.coursesService.getCourse(action.id)
        .pipe(
            map(course => CoursesActions.requestSingleCourseSuccess({ course })),
            catchError(error => of(CoursesActions.requestSingleCourseFail({ error })))
        )
      )
    ));
  
    deleteCourse$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap(action => this.coursesService.deleteCourse(action.id)
        .pipe(
            map(() => CoursesActions.requestDeleteCourseSuccess({ id: action.id })),
            catchError(error => of(CoursesActions.requestDeleteCourseFail({ error })))
        )
      )
    ));

    editCourse$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap(action => this.coursesService.editCourse(action.course, action.id)
        .pipe(
            map(() => CoursesActions.requestEditCourseSuccess({ course: action.course })),
            catchError(error => of(CoursesActions.requestEditCourseFail({ error })))
        )
      )
    ));
  
    createCourse$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap(action => this.coursesService.createCourse(action.course)
        .pipe(
            map(course => CoursesActions.requestCreateCourseSuccess({ course })),
            catchError(error => of(CoursesActions.requestCreateCourseFail({ error })))
        )
      )
    ));

    redirectToTheCoursesPage$ = createEffect(() => this.actions$.pipe(
      ofType(
        CoursesActions.requestCreateCourseSuccess,
        CoursesActions.requestEditCourseSuccess,
        CoursesActions.requestSingleCourseFail
      ),
      map(() => this.router.navigate(['/courses']))
    ), { dispatch: false });
}