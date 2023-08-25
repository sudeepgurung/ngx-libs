import {NgxMitiService} from './ngx-miti.service';

import {
  Component,
  OnInit,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {IDate, INepaliDate, IResultDate} from './types';
import {BS, daysMapping, monthsMapping} from './core';

@Component({
  selector: 'ngx-miti',
  templateUrl: './ngx-miti.component.html',
  styleUrls: ['./ngx-miti.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxMitiComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NgxMitiComponent implements OnInit, ControlValueAccessor {
  @Input()
  initialDate: string = '';

  @Input()
  inputClass: string = '';

  @Input()
  language: 'en' | 'ne' = 'en';

  isOpen = false;

  today: IResultDate | undefined;
  selectedDate: IResultDate | undefined;
  selectedDateString: string = '';

  years: number[] = [];
  months: string[] = [];
  daysLabel: string[] = [];
  currentMonthData: IResultDate[] = [];

  currentCalendarMonth: number = 0;
  currentCalendarYear: number = 0;

  constructor(private _nms: NgxMitiService) {
  }

  ngOnInit() {
    this.today = this._nms.ad2bs();
    if (this.initialDate === '') {
      this.selectedDate = this.today;
    } else {
      this.selectedDate = this._nms.ad2bs(this.initialDate);
    }
    this.selectedDateString = this.getEnglishDateStringFromDateObject(this.selectedDate.date)

    this.currentCalendarMonth = this.selectedDate.nepaliDate.nepaliMonth;
    this.currentCalendarYear = this.selectedDate.nepaliDate.nepaliYear;

    this.populateYears();
    this.populateMonths();
    this.populateDaysLabel();
    // this.setCurrentMonthData();
    this.populateCurrentMonthData(this.currentCalendarMonth, this.currentCalendarYear)
  }

  populateYears() {
    for (let i = 2080; i <= 2099; i++) {
      this.years.push(i);
    }
  }

  populateMonths() {
    this.months = monthsMapping.en.long!;
  }

  populateDaysLabel() {
    this.daysLabel = daysMapping.en.short;
  }

  resetCurrentMonthData() {
    this.currentMonthData = [];
  }

  propagateChange = (_: any) => {
  };

  propagateTouch = (_: any) => {
  };

  writeValue(value: IResultDate) {
    if (value) {
      this.selectedDate = value;
    }
  }

  registerOnTouched() {
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  populateCurrentMonthData(month: number, year: number) {
    this.resetCurrentMonthData();
    const daysInThisMonth = (BS.find(bs => bs[0] === year))![month]
    console.log(this.selectedDate)
    for (let i = 1; i <= daysInThisMonth; i++) {
      const d = this._nms.bs2ad({nepaliYear: year, nepaliMonth: month, nepaliDay: i})
      this.currentMonthData.push({nepaliDate: d.nepaliDate, date: d.date})
    }
    const firstDay = this.getWeeDayFromDateObject(this.currentMonthData[0].date);
    const lastDay = this.getWeeDayFromDateObject(this.currentMonthData[daysInThisMonth - 1].date);


    let daysInPrevMonth: number = (BS.find(bs => bs[0] === year))![month - 1];
    let prevMonthDay = daysInPrevMonth;
    for (let j = firstDay - 1; j >= 0; j--) {
      const d = this._nms.bs2ad({nepaliYear: year, nepaliMonth: month - 1, nepaliDay: prevMonthDay})
      this.currentMonthData.unshift({nepaliDate: d.nepaliDate, date: d.date})
      prevMonthDay--;
    }

    let nextMonthDay = 0;
    for (let k = lastDay + 1; k <= 6; k++) {
      nextMonthDay++;
      const d = this._nms.bs2ad({nepaliYear: year, nepaliMonth: month + 1, nepaliDay: nextMonthDay})
      this.currentMonthData.push({nepaliDate: d.nepaliDate, date: d.date})
    }
    console.log(this.currentMonthData)
  }


  selectDate(day: IResultDate) {
    this.selectedDate = day;
    this.selectedDateString = this.getEnglishDateStringFromDateObject(day.date)
    this.propagateChange(day)
    this.close();
  }

  selectYear(event: Event) {
    const year = (event.target as HTMLInputElement).value;
  }

  selectMonth(event: Event) {
    const month = (event.target as HTMLInputElement).value;
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  getEnglishDateStringFromDateObject(dateObject: IDate) {
    return `${dateObject.year}-${
      dateObject.month <= 9 ? '0' + dateObject.month : dateObject.month
    }-${dateObject.day <= 9 ? '0' + dateObject.day : dateObject.day}`
  }

  getWeeDayFromDateObject(dateObject: IDate) {
    const ad = `${dateObject.year}-${
      dateObject.month <= 9 ? '0' + dateObject.month : dateObject.month
    }-${dateObject.day <= 9 ? '0' + dateObject.day : dateObject.day}`

    return new Date(ad).getDay();
  }
}
