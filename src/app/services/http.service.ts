import { Injectable } from '@angular/core';
import { Manager} from '../domains/manager.model';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {ConvertService} from './convert.service';
import {ScheduleItem} from '../domains/ScheduleItem';

@Injectable()
export class HttpService {

  private managers_url = 'http://srv-dev-01.kt.local/Hryshenchuk/hs/ut/managers/';
  private schedule_url = 'http://srv-dev-01.kt.local/Hryshenchuk/hs/ut/baseSchedulers/';
  constructor(private http: HttpClient, private convert: ConvertService) {
  }

  getApiData() {
    const schedules: ScheduleItem[] = [];
    const managers: Manager[] = [];
    return forkJoin(
      this.http.get(this.schedule_url).pipe(map(res => {
        return this.convert.intoScheduleItems(res, schedules);
      })),
      this.http.get(this.managers_url).pipe(map(res => {
        return this.convert.intoManagers(res, managers);
      }))
    );
  }

}
