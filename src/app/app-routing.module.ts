import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { NgModule } from '@angular/core';
import { CoursesListComponent } from './features/courses/courses-list/courses-list.component';

export const routes: Routes = [
    /* Add your code here */
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegistrationFormComponent },
    { path: 'course', component: CourseFormComponent },
    { path: 'course-list', component: CoursesListComponent },
    { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
