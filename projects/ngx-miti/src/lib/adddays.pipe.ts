import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'adddays' })
export class AddDaysPipe implements PipeTransform {
  constructor() {}

  transform(date: string, days: number = 0) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);

    const datePart = result.getDate();
    const monthPart = result.getMonth() + 1;
    const yearPart = result.getFullYear();

    return (
      yearPart +
      '-' +
      (monthPart < 10 ? '0' + monthPart : monthPart) +
      '-' +
      (datePart < 10 ? '0' + datePart : datePart)
    );
  }
}
