import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date = new Date();
  public weekDay = this.date.getDay();
  public day = this.date.getDate();
  public options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

  constructor() { }

  getMonday() {
    const monday = this.day - this.weekDay + (this.day === 0 ? -6 : 1);
    return new Date(this.date.setDate(monday)).toLocaleDateString( 'en-US', this.options);
  };

  getTuesday() {
    const tuesday = this.day - this.weekDay + (this.day === 0 ? -6 : 2);
    return new Date(this.date.setDate(tuesday)).toLocaleDateString( 'en-US', this.options);
  };

  getWednesday() {
    const wednesday = this.day - this.weekDay + (this.day === 0 ? -6 : 3);
    return new Date(this.date.setDate(wednesday)).toLocaleDateString( 'en-US', this.options);
  };

  getThursday() {
    const thursday = this.day - this.weekDay + (this.day === 0 ? -6 : 4);
    return new Date(this.date.setDate(thursday)).toLocaleDateString( 'en-US', this.options);
  };

  getFriday() {
    const friday = this.day - this.weekDay + (this.day === 0 ? -6 : 5);
    return new Date(this.date.setDate(friday)).toLocaleDateString( 'en-US', this.options);
  };

  transfromIntoStringDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', this.options);
  }

  getF() {
    const friday = this.day - this.weekDay + (this.day === 0 ? -6 : 5);
    return new Date(this.date.setDate(friday)).toLocaleDateString( 'en-US', this.options);
  }
}
