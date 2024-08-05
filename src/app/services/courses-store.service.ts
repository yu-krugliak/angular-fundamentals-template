import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, switchMap, tap } from 'rxjs';
import { CoursesService } from './courses.service';
import { Course } from '@app/store/courses/course';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    private courses$$ = new BehaviorSubject<any[]>([]);

    public isLoading$ = this.isLoading$$.asObservable();    
    public courses$ = this.courses$$.asObservable();

    constructor(private coursesService: CoursesService) {}

    getAll() {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.getAll().pipe(
          tap((courses: any) => {
            this.courses$$.next(courses);
            this.isLoading$$.next(false);
          }),
          catchError(error => {
            this.isLoading$$.next(false);
            throw error;
          })
        ).subscribe();
    }

    createCourse(course: Observable<Course>) { // replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.createCourse(course).pipe(
          switchMap(() => this.coursesService.getAll()),
          tap((courses: any) => {
            this.courses$$.next(courses);
            this.isLoading$$.next(false);
          }),
          catchError(error => {
            this.isLoading$$.next(false);
            throw error;
          })
        ).subscribe();
    }

    getCourse(id: string) {
        // Add your code here
        this.isLoading$$.next(true);
        return this.coursesService.getCourse(id).pipe(
          tap(() => this.isLoading$$.next(false)),
          catchError(error => {
            this.isLoading$$.next(false);
            throw error;
          })
        );
    }

    editCourse(id: string, course: Observable<Course>) { // replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.editCourse(id, course).pipe(
          switchMap(() => this.coursesService.getAll()),
          tap((courses: any) => {
            this.courses$$.next(courses);
            this.isLoading$$.next(false);
          }),
          catchError(error => {
            this.isLoading$$.next(false);
            throw error;
          })
        ).subscribe();
    }

    deleteCourse(id: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.deleteCourse(id).pipe(
          switchMap(() => this.coursesService.getAll()),
          tap((courses: any) => {
            this.courses$$.next(courses);
            this.isLoading$$.next(false);
          }),
          catchError(error => {
            this.isLoading$$.next(false);
            throw error;
          })
        ).subscribe();
    }

    filterCourses(value: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(value).pipe(
          tap(courses => {
            this.courses$$.next(courses);
            this.isLoading$$.next(false);
          }),
          catchError(error => {
            this.isLoading$$.next(false);
            throw error;
          })
        ).subscribe();
    }

    getAllAuthors() {
        // Add your code here
        return this.coursesService.getAllAuthors();
    }

    createAuthor(name: string) {
        // Add your code here
        return this.coursesService.createAuthor(name);
    }

    getAuthorById(id: string) {
        // Add your code here
        return this.coursesService.getAuthorById(id);
    }

    searchCourses(searchParams: string): void {
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(searchParams).pipe(
          tap(courses => {
            this.courses$$.next(courses);
            this.isLoading$$.next(false);
          }),
          catchError(error => {
            this.isLoading$$.next(false);
            console.error('Error in the searching courses:', error);
            throw error;
          })
        ).subscribe();
    }
}
