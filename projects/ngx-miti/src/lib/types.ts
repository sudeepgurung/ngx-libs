export interface INepaliDate {
  nepaliYear: number;
  nepaliMonth: number;
  nepaliDay: number;
}

export interface IDate {
  year: number;
  month: number;
  day: number;
}

export interface IResultDate {
  nepaliDate: INepaliDate;
  date: IDate;
}

export interface IMonthData {
  nepali: number,
  english: number,
  day: number;
}
