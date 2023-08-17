import { NgxMitiService } from './ngx-miti.service';

import {
  Component,
  OnInit,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { IMonthData, IResultDate } from './types';
import { daysMapping, monthsMapping } from './core';
// import {
//   NepaliDate,
//   MonthData,
//   DaysMapping,
//   MonthMapping,
//   DateFormatter,
// } from './types';
// import { daysMapping, monthsMapping } from './mapping';

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
  displayDateString: string = '';
  selectedDateString: string = '';
  years: number[] = [];
  months: string[] = [];
  daysLabel: string[] = [];
  currentMonthData: IMonthData[] = [];

  constructor(private _nms: NgxMitiService) {}

  ngOnInit() {
    const today = this._nms.ad2bs();
    if (this.initialDate === '') {
      this.selectedDate = today;
    } else {
      this.selectedDate = this._nms.ad2bs(this.initialDate);
    }
    console.log(this.selectedDate);
    const ed = this.selectedDate.date;
    this.selectedDateString = `${ed.year}-${
      ed.month <= 9 ? '0' + ed.month : ed.month
    }-${ed.day <= 9 ? '0' + ed.day : ed.day}`;
    this.populateYears();
    this.populateMonths();
    this.populateDaysLabel();
    this.setCurrentMonthData();
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

  propagateChange = (_: any) => {};

  propagateTouch = (_: any) => {};

  writeValue(value: IResultDate) {
    if (value) {
      this.selectedDate = value;
    }
  }

  registerOnTouched() {}

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  setCurrentMonthData() {
    this.resetCurrentMonthData();

    const day = new Date(this.selectedDateString).getDay();
    const date = this.selectedDate?.date.day;

    console.log(day, date);
  }

  selectDate(day: number) {
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
}
