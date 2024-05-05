import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { ChosenCoursesComponent } from './chosen-courses/chosen-courses.component';

export const routes: Routes = [
    {path: '', component: CoursesComponent},
    {path: 'ramschema', component: ChosenCoursesComponent}
];
