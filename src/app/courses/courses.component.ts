import { Component } from '@angular/core';
import { LoadCoursesService } from '../services/load-courses.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
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
  searchTerm: string = '';
  searchArr: string[] = [];
  storageArr: string[] = []

  constructor(private loadCourses: LoadCoursesService) {}
  ngOnInit(): void {
    this.loadCourses.getCourses().subscribe((data) => {
      this.courses = data;
      for (let index = 0; index < this.courses.length; index++) {
        this.copyOfCourses.push(this.courses[index]);

        // skapar en array med alla subjects, gör så bara subjects läggs till en gång genom att kolla om ett subject redan finns i array:n
        if (!this.uniqueSubjects.includes(this.courses[index].subject)) {
          //if sats tagen härifrån: https://www.golinuxcloud.com/javascript-array-unique/
          this.uniqueSubjects.push(this.courses[index].subject);
        }
      }
      //sorterar subjects så a är först och ö sist
      this.uniqueSubjects = this.uniqueSubjects.sort((a, b) =>
        a > b ? 1 : -1
      );
      for (let index = 0; index < this.courses.length; index++) {
        //lägger till alla kurser i en string array med kod och namn
        this.searchArr.push(
          `${this.courses[index].courseCode.toLowerCase()} ${this.courses[
            index
          ].courseName.toLowerCase()}`
        );
      }
    });
  }

  addToSchema(element: any): void{
    let storedCodes: string = localStorage.getItem('courseCodes')|| '';
    if (storedCodes != '') {
      this.storageArr = storedCodes.split(',') ;
    }
    if (!this.storageArr.includes(element.srcElement.id)) {
      this.storageArr.push(element.srcElement.id);
    }
    let courseCodes = this.storageArr.toString();
    localStorage.setItem('courseCodes', courseCodes)
  }

  // Återanvänder basen från den sökfunktion jag byggde i lab 4, ändrade/tog bort en del saker som var onödiga
  searchTable(): void {
    let searchedArr: any[] = []; //kurser från courseArr som matchar sökning

    for (let index = 0; index < this.courses.length; index++) {
      //kollar om sökningen matchar kod eller namn på kurs
      let matchesSearchTerm: number = this.searchArr[index].search(
        this.searchTerm.toLowerCase()
      );
      //om den matchar läggs den kursen till i searchedArr
      if (matchesSearchTerm != -1) {
        searchedArr.push(this.courses[index]);
      }
    }
    this.copyOfCourses = searchedArr;
  }

  filterByTopic(keywords: string[]): void {
    let tempArr: any[] = [];
    // går igenom copy of courses och kollar om en kurs subject matchar något av de keyword man valt att filtrera med
    for (let index = 0; index < this.courses.length; index++) {
      for (let i = 0; i < keywords.length; i++) {
        if (keywords[i] == this.courses[index].subject) {
          tempArr.push(this.courses[index]);
        }
      }
    }
    // om tempArr är tom (ingen checkbox klickad) så får den värdet av courses
    if (tempArr.length == 0) {
      tempArr = this.courses;
    }
    this.copyOfCourses = tempArr;
  }

  // när en ruta klickas i på filtrerings menyn körs denna och dess id läggs till i keywordArr
  addKeyWordToFilter(element: any): void {
    if (!element.srcElement.checked) {
      for (let index = 0; index < this.keyWordArr.length; index++) {
        if (this.keyWordArr[index] == element.srcElement.id) {
          this.keyWordArr.splice(index, 1);
        }
      }
    } else {
      this.keyWordArr.push(element.srcElement.id);
    }
    this.filterByTopic(this.keyWordArr);
  }

  //återanvänder sort funktioner jag gjort i lab 4
  sortByCode(): void {
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
    this.codeSorted = false;
    this.nameSorted = false;
    this.pointSorted = false;
    if (this.subjectSorted == false) {
      // sorterar array efter subject
      this.copyOfCoursesSorted = this.copyOfCourses.sort((a, b) =>
        a.subject > b.subject ? 1 : -1
      );
      this.copyOfCourses = this.copyOfCoursesSorted;
      this.subjectSorted = true;
    } else {
      this.copyOfCoursesSorted = this.copyOfCourses.sort((a, b) =>
        a.subject > b.subject ? -1 : 1
      );
      this.copyOfCourses = this.copyOfCoursesSorted;
      this.subjectSorted = false;
    }
  }
}
