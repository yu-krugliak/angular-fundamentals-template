import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';

// Add your code here
export const coursesFeatureKey = 'courses';

export interface CoursesState {
    // Add your code here
    allCourses: any[] | null;
    course: any | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string | null;
}

export const initialState: CoursesState = {
    // Add your code here
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null
};

export const coursesReducer = createReducer(
    initialState,

    // all courses
    on(CoursesActions.requestAllCourses, (state) => ({
      ...state,
      isAllCoursesLoading: true,
      errorMessage: null
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
      ...state,
      allCourses: courses,
      isAllCoursesLoading: false
    })),
    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
      ...state,
      isAllCoursesLoading: false,
      errorMessage: error
    })),

    // single course
    on(CoursesActions.requestSingleCourse, (state) => ({
      ...state,
      isSingleCourseLoading: true,
      errorMessage: null
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
      ...state,
      course: course,
      isSingleCourseLoading: false
    })),
    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
      ...state,
      isSingleCourseLoading: false,
      errorMessage: error
    })),

    // filtered courses
    on(CoursesActions.requestFilteredCourses, (state) => ({
      ...state,
      isSearchActive: true,
      errorMessage: null
    })),
    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
      ...state,
      allCourses: courses,
      isSearchActive: false
    })),
    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
      ...state,
      isSearchActive: false,
      errorMessage: error
    })),

    // delete course
    on(CoursesActions.requestDeleteCourse, state => ({
      ...state,
      errorMessage: null
    })),
    on(CoursesActions.requestDeleteCourseSuccess, (state, { id }) => ({
      ...state,
      allCourses: state.allCourses ? state.allCourses.filter(course => course.id !== id) : [],
    })),
    on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
      ...state,
      errorMessage: error
    })),

    // edit course
    on(CoursesActions.requestEditCourse, (state) => ({
      ...state,
      errorMessage: null
    })),
    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
      ...state,
      allCourses: state.allCourses? state.allCourses.map(c => c.id === course.id ? course : c) : [],
      course: course,
    })),
    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
      ...state,
      errorMessage: error
    })),

    // create course
    on(CoursesActions.requestCreateCourse, (state) => ({
      ...state,
      errorMessage: null
    })),
    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
      ...state,
      allCourses: [...state.allCourses!, course],
    })),
    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
      ...state,
      errorMessage: error
    }))
); 

// Add your code here

export const reducer = (state: CoursesState | undefined, action: Action): CoursesState => coursesReducer(state, action);