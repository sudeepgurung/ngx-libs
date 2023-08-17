import { Pipe, PipeTransform } from '@angular/core';
import { NgxMitiService } from './ngx-miti.service';
import { INepaliDate } from './types';
import { numberMapping } from './core';

@Pipe({
  name: 'ad2bs',
})
export class Ad2BsPipe implements PipeTransform {
  result: string = '';
  constructor(private _nms: NgxMitiService) {}
  transform(
    engDate: string,
    language: string = 'en',
    format: string = 'yyyy-mm-dd' //long, short, yyyy-mm-dd, mm-dd-yyyy, mm-dd-yy
  ): string {
    if (engDate) {
      const resultDate = this._nms.ad2bs(engDate);
      const nd = resultDate.nepaliDate;
      switch (format) {
        case 'mm-dd-yyyy':
          this.result = `${nd.nepaliMonth}-${nd.nepaliDay}-${nd.nepaliYear}`;
          return language === 'ne' ? toNepaliNumber(this.result) : this.result;
          break;
        case 'mm-dd-yy':
          this.result = `${nd.nepaliMonth}-${nd.nepaliDay}-${nd.nepaliYear
            .toString()
            .substring(2, 2)}`;
          return language === 'ne' ? toNepaliNumber(this.result) : this.result;
          break;
        case 'long':
          this.result = `${nd.nepaliYear}-${nd.nepaliMonth}-${nd.nepaliDay}`;
          return language === 'ne'
            ? toNepaliWord(this.result, 'l')
            : this.result;
          break;
        case 'short':
          this.result = `${nd.nepaliYear}-${nd.nepaliMonth}-${nd.nepaliDay}`;
          return language === 'ne'
            ? toNepaliWord(this.result, 's')
            : this.result;
          break;
        default: // yyyy-mm-dd
          this.result = `${nd.nepaliYear}-${
            nd.nepaliMonth <= 9 ? '0' + nd.nepaliMonth : nd.nepaliMonth
          }-${nd.nepaliDay <= 9 ? '0' + nd.nepaliDay : nd.nepaliDay}`;
          return language === 'ne' ? toNepaliNumber(this.result) : this.result;
      }
    } else {
      return 'Error';
    }
  }
}

function toNepaliNumber(result: string) {
  const split = result.split('');
  return split
    .map((n) => {
      if (n === '-') {
        return '-';
      }
      return numberMapping[+n] ? numberMapping[+n] : n;
    })
    .join('');
}

function toNepaliWord(result: string, form: string) {
  let ans = result.replace('-', ' साल ');
  ans = result.replace('-', ' महिना ');
  ans += ' गते';
  return ans;
}

// 2080 Poush 19
