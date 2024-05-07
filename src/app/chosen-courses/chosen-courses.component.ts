import { Component } from '@angular/core';
import { LoadChoseCoursesService } from '../services/load-chose-courses.service';
import { LoadCoursesService } from '../services/load-courses.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chosen-courses',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './chosen-courses.component.html',
  styleUrl: './chosen-courses.component.scss',
})
export class ChosenCoursesComponent {
  constructor(
    private loadChoseCoursesService: LoadChoseCoursesService,
    private loadCourses: LoadCoursesService
  ) {}

  loadedCourseCodes: string[] = [];
  courses: any[] = [];
  //en array för att lagra de kurser som användaren lagt till i sitt ramschema
  loadedCourses: any[] = [];
  totalPoints: number = 0;

  ngOnInit(): void {
    this.loadCourses.getCourses().subscribe((data) => {
      this.courses = data;
      this.loadedCourseCodes =
        this.loadChoseCoursesService.getCoursesFromStorage();

      // kollar om koden som ligger i array matchar koden på någon kurs, isåfall läggs den i loadedCourse
      for (let index = 0; index < this.courses.length; index++) {
        for (let i = 0; i < this.loadedCourseCodes.length; i++) {
          if (this.courses[index].courseCode == this.loadedCourseCodes[i]) {
            this.loadedCourses.push(this.courses[index]);
            this.totalPoints = this.totalPoints + Number(this.courses[index].points);
          }
        }
      }
    });
  }

  removeFromSchema(element: any):void{
    for (let index = 0; index < this.loadedCourses.length; index++) {
      // tar bort kursen ur loadedCourses och tar bort kursens poäng från totalpoints
      if (element.srcElement.id == this.loadedCourses[index].courseCode) {
        this.totalPoints = this.totalPoints - Number(this.loadedCourses[index].points);
        this.loadedCourses.splice(index, 1);
      }
      // tar bort kursens kod ur loadedCourseCodes, måste göras i en egen if sats för de har annorlunda index
      if (element.srcElement.id == this.loadedCourseCodes[index]) {
        this.loadedCourseCodes.splice(index, 1);
      }
    }
    let courseCodes = this.loadedCourseCodes.toString();
    localStorage.setItem('courseCodes', courseCodes)
  }
}
