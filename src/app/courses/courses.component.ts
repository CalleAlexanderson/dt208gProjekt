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
  uniqueSubjects: string[] = [];

  constructor(private loadCourses: LoadCoursesService) {}
  ngOnInit(): void {
    this.loadCourses.getCourses().subscribe((data) => {
      this.courses = data;
      for (let index = 0; index < this.courses.length; index++) {
        this.copyOfCourses.push(this.courses[index]);

        // skapar en array med alla subjects, gör så bara subjects läggs till en gång genom att kolla om ett subject redan finns i array:n
        if (!this.uniqueSubjects.includes(this.courses[index].subject)) { //if sats tagen härifrån: https://www.golinuxcloud.com/javascript-array-unique/
          this.uniqueSubjects.push(this.courses[index].subject);
        }
      }
      //sorterar subjects så a är först och ö sist
      this.uniqueSubjects = this.uniqueSubjects.sort((a, b) =>
        a > b ? 1 : -1
      );
    });
  }
  

  filterByTopic(keywords: string[]): void{
    let tempArr: any[] = [];
    // går igenom copy of courses och kollar om en kurs subject matchar något av de keyword man valt att filtrera med
    for (let index = 0; index < this.courses.length; index++) {
      for (let i = 0; i < keywords.length; i++) {
        if (keywords[i] == this.courses[index].subject) {
          tempArr.push(this.courses[index]);
        }
      }
    }
    if (tempArr.length == 0) {
      tempArr = this.courses;
    }
    console.log(tempArr);
    this.copyOfCourses = tempArr;
  }

  // när en ruta klickas i på filtrerings menyn körs denna och dess keyword läggs till i keywordArr
  addKeyWordToFilter(element: any):void{
    console.log(element.srcElement.checked);
    console.log(element.srcElement.id);
    console.log("kör adddkeyword");
    if (!element.srcElement.checked) {
      for (let index = 0; index < this.keyWordArr.length; index++) {
        if (this.keyWordArr[index] == element.srcElement.id) {
          this.keyWordArr.splice(index, 1)
        }
      }
    } else {
      this.keyWordArr.push(element.srcElement.id)
    }
    console.log(this.keyWordArr);
    this.filterByTopic(this.keyWordArr);
  }


  //återanvänder sort funktioner jag gjort i lab 4
  sortByCode(): void {
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
}
