import { Injectable } from '@angular/core';
import { LoadCoursesService } from '../services/load-courses.service';

@Injectable({
  providedIn: 'root',
})
export class LoadChoseCoursesService {
  constructor() {}

  getCoursesFromStorage(): string[] {

    //har ett alternativ om localstorage inte fungerar för annars får TS spel
    let coursesFromStorage: string =
      localStorage.getItem('courseCodes') || 'Inga kurser';

    //omvandlar string från localstorage till en array
    let courseCodesFromStorage: string[] = coursesFromStorage.split(',');

    
    return courseCodesFromStorage;
  }
}
