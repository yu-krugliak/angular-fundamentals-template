import { createFeatureSelector, createSelector } from "@ngrx/store";
import { coursesFeatureKey, CoursesState } from "./courses.reducer";
// Add your code here

const selectCoursesFeatureState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const isAllCoursesLoadingSelector = createSelector(
  selectCoursesFeatureState,
  (state: CoursesState) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
  selectCoursesFeatureState,
  (state: CoursesState) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
  selectCoursesFeatureState,
  (state: CoursesState) => state.isSingleCourseLoading
);

export const getAllCourses = createSelector(
  selectCoursesFeatureState,
  (state: CoursesState) => state.allCourses
);

export const getCourse = createSelector(
  selectCoursesFeatureState,
  (state: CoursesState) => state.course
);

export const getErrorMessage = createSelector(
  selectCoursesFeatureState,
  (state: CoursesState) => state.errorMessage
);
