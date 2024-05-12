import { Injectable } from '@angular/core';

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

    if (courseCodesFromStorage[0] == 'Inga kurser') {

      return [];
    } else {
      return courseCodesFromStorage;
    }
    
  }
}
