import { Component } from '@angular/core';
import { LoadCoursesService } from '../services/load-courses.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses: any[] = [];
  copyOfCourses: any[] = [];
  keyWordArr: string[] = [];
  codeSorted: boolean = false;
  nameSorted: boolean = false;
  subjectSorted: boolean = false;
  pointSorted: boolean = false;
  copyOfCoursesSorted: any[] = [];

  constructor(private loadCouurses: LoadCoursesService) {}
  ngOnInit(): void {
    this.loadCouurses.getCourses().subscribe((data) => {
      this.courses = data;
      for (let index = 0; index < this.courses.length; index++) {
        this.copyOfCourses.push(this.courses[index]);
      }
    });
  }
  

  filterByTopic(keywords: string[]): void{
    let tempArr: any[] = [];

    // går igenom copy of courses och kollar om en kurs subject matchar något av de keyword man valt att filtrera med
    for (let index = 0; index < this.copyOfCourses.length; index++) {
      for (let i = 0; i < keywords.length; i++) {
        if (keywords[i] == this.copyOfCourses[index].subject) {
          tempArr.push(this.copyOfCourses[index]);
        }
      }
    }
    this.copyOfCourses = tempArr;
  }

  // när en ruta klickas i på filtrerings menyn körs denna och dess keyword läggs till i keywordArr
  addKeyWordToFilter():void{
    this.filterByTopic(this.keyWordArr);
  }


  //återanvänder sort funktioner jag gjort i lab 4
  sortByCode(): void {
    this.resetTable();
    console.log('sorterar efter kod');
    this.nameSorted = false;
    this.subjectSorted = false;
    this.pointSorted = false;
    if (this.codeSorted == false) {
      // sorterar array efter code
      this.copyOfCoursesSorted = this.copyOfCourses.sort((a, b) =>
        a.courseCode > b.courseCode ? 1 : -1
      );
      this.copyOfCourses = this.copyOfCoursesSorted;

      this.codeSorted = true;
    } else {
      this.copyOfCoursesSorted = this.copyOfCourses.sort((a, b) =>
        a.courseCode > b.courseCode ? -1 : 1
      );
      this.copyOfCourses = this.copyOfCoursesSorted;
      this.codeSorted = false;
    }
  }

  sortByName(): void {
    this.resetTable();
    console.log('sorterar efter namn');
    this.codeSorted = false;
    this.subjectSorted = false;
    this.pointSorted = false;
    if (this.nameSorted == false) {
      // sorterar array efter namn
      this.copyOfCoursesSorted = this.copyOfCourses.sort((a, b) =>
        a.courseName > b.courseName ? 1 : -1
      );
      this.copyOfCourses = this.copyOfCoursesSorted;
      this.nameSorted = true;
    } else {
      this.copyOfCoursesSorted = this.copyOfCourses.sort((a, b) =>
        a.courseName > b.courseName ? -1 : 1
      );
      this.copyOfCourses = this.copyOfCoursesSorted;
      this.nameSorted = false;
    }
  }

  sortByPoints(): void {
    this.resetTable();
    console.log('sorterar efter poäng');
    this.codeSorted = false;
    this.nameSorted = false;
    this.subjectSorted = false;

    if (this.pointSorted == false) {
      // sorterar array efter poäng
      this.copyOfCoursesSorted = this.copyOfCourses.sort((a, b) =>
        a.points > b.points ? 1 : -1
      );
      this.copyOfCourses = this.copyOfCoursesSorted;
      this.pointSorted = true;
    } else {
      this.copyOfCoursesSorted = this.copyOfCourses.sort((a, b) =>
        a.points > b.points ? -1 : 1
      );
      this.copyOfCourses = this.copyOfCoursesSorted;
      this.pointSorted = false;
    }
  }

  sortBySubject(): void {
    this.resetTable();
    console.log('sorterar efter subject');
    this.codeSorted = false;
    this.nameSorted = false;
    this.pointSorted = false;
    if (this.subjectSorted == false) {
      // sorterar array efter subject
      this.copyOfCoursesSorted = this.copyOfCourses.sort((a, b) =>
        a.subjectCode > b.subjectCode ? 1 : -1
      );
      this.copyOfCourses = this.copyOfCoursesSorted;
      this.subjectSorted = true;
    } else {
      this.copyOfCoursesSorted = this.copyOfCourses.sort((a, b) =>
        a.subjectCode > b.subjectCode ? -1 : 1
      );
      this.copyOfCourses = this.copyOfCoursesSorted;
      this.subjectSorted = false;
    }
  }

  resetTable(): void {
    console.log('tabell återställd');

    this.copyOfCourses = [];
    for (let index = 0; index < this.courses.length; index++) {
      this.copyOfCourses.push(this.courses[index]);
    }
    console.log(this.courses);
  }
}
