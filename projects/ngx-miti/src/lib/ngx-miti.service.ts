import { Injectable } from '@angular/core';
import { IDate, INepaliDate, IResultDate } from './types';
import { BS, genesis } from './core';

@Injectable({
  providedIn: 'root',
})
export class NgxMitiService {
  constructor() { }

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
    let iterateMore = true;
    let daysPassed = Math.floor(
      (currentEpoch - genesis) / (1000 * 60 * 60 * 24)
    );

    BS.every((yearData) => {
      yearData.every((monthDays, i) => {
        if (i > 0) {
          const lastDaysPassed = daysPassed;
          daysPassed -= monthDays;

          if (daysPassed < 0) {
            nepaliYear = yearData[0];
            nepaliMonth = i;
            nepaliDay = lastDaysPassed + 1;
            iterateMore = false;
            return false;
          } else if(daysPassed === 0) {
            nepaliYear = yearData[0];
            nepaliMonth = i+1;
            nepaliDay =  1;
            iterateMore = false;
            return false;

        } else {
            return true;
          }
        }
        return true;
      });
      return iterateMore;
    });
    return {
      nepaliDate: { nepaliYear, nepaliMonth, nepaliDay },
      date: { year, month, day },
    };
  }

  bs2ad(nepaliDate: INepaliDate): IResultDate {
    const y = nepaliDate.nepaliYear;
    const m = nepaliDate.nepaliMonth;
    const d = nepaliDate.nepaliDay;
    // days passed since genesis ( 2080/1/1)
    // today 2088 05 - 14
    //
    let daysPassed = 0;
    BS.every((yearData) => {
      if (y > yearData[0]) {
        yearData.every((monthDays, i) => {
          if (i > 0) {
            daysPassed += monthDays;
          }
        })
      }
      console.log(yearData[0], y)
      if (y === yearData[0]) {
        for (let i = 1; i < m; i++) {
          daysPassed += yearData[i];
        }
        daysPassed += (d - 1);
        return false
      }
      return true;
    });
    const passedTime = (1000 * 60 * 60 * 24) * daysPassed;
    const currentTime = genesis + passedTime;
    const dt = new Date(currentTime);
    const year = dt.getFullYear();
    const month = dt.getMonth() + 1;
    const day = dt.getDate();
    const date: IDate = {
      year, month, day
    }
    return {
      nepaliDate, date
    }
  }
}
