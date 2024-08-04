import { RouterModule, Routes } from '@angular/router';
import { CourseCardComponent, CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { NgModule } from '@angular/core';
import { CoursesComponent } from './features/courses/courses.component';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';

export const routes: Routes = [
    /* Add your code here */
    { path: 'login', component: LoginFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: 'registration', component: RegistrationFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: 'courses', component: CoursesComponent,
        children: [
            { path: 'add', component: CourseFormComponent, canLoad: [AuthorizedGuard, AdminGuard] },
            { path: 'edit/:id', component: CourseFormComponent, canLoad: [AuthorizedGuard, AdminGuard] },
            { path: ':id', component: CourseCardComponent, canLoad: [AuthorizedGuard] }
        ],
        canLoad: [AuthorizedGuard] 
    },
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: '**', redirectTo: '/courses', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
