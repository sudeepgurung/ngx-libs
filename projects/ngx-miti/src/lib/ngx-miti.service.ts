import { Injectable } from '@angular/core';
import { IResultDate } from './types';
import { BS, genesis } from './core';

@Injectable({
  providedIn: 'root',
})
export class NgxMitiService {
  constructor() {}

  ad2bs(englishDate?: string): IResultDate {
    let dt;
    if (englishDate) {
      dt = new Date(englishDate);
    } else {
      dt = new Date();
    }
    const year = dt.getFullYear();
    const month = dt.getMonth() + 1;
    const day = dt.getDate();
    let nepaliYear = 0;
    let nepaliMonth = 0;
    let nepaliDay = 0;
    const currentEpoch = dt.getTime();
    let iterageMore = true;
    let daysPassed = Math.floor(
      (currentEpoch - genesis) / (1000 * 60 * 60 * 24)
    );

    BS.every((yearData) => {
      yearData.every((monthDays, i) => {
        if (i > 0) {
          const lastDaysPassed = daysPassed;
          daysPassed -= monthDays;
          // console.log(monthDays, daysPassed);

          if (daysPassed <= 0) {
            nepaliYear = yearData[0];
            nepaliMonth = i;
            nepaliDay = lastDaysPassed + 1;
            iterageMore = false;
            return false;
          } else {
            return true;
          }
        }
        return true;
      });
      // console.log(iterageMore);
      return iterageMore ? true : false;
    });
    return {
      nepaliDate: { nepaliYear, nepaliMonth, nepaliDay },
      date: { year, month, day },
    };
  }
}
