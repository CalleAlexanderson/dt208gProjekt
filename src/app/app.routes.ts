import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { ChosenCoursesComponent } from './chosen-courses/chosen-courses.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'kurser', component: CoursesComponent},
    {path: 'ramschema', component: ChosenCoursesComponent}
];
