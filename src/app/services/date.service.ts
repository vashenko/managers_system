import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private format: string;
  constructor() {
    this.format = 'dddd, MMMM D, YYYY';
  }

  public get Monday(): string {
    return moment().weekday(1).format(this.format);
  }

  public get Tuesday(): string {
    return moment().weekday(2).format(this.format);
  }

  public get Wednesday(): string {
    return moment().weekday(3).format(this.format);
  }

  public get Thursday(): string {
    return moment().weekday(4).format(this.format);
  }

  public get Friday(): string {
    return moment().weekday(5).format(this.format);
  }

  public transfromIntoStringDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
  }

}
