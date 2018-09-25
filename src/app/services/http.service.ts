import { Injectable } from '@angular/core';
import { Manager} from '../domains/manager.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin} from 'rxjs';
import { map } from 'rxjs/operators';
import {ConvertService} from './convert.service';
import {ScheduleItem} from '../domains/ScheduleItem';
import {RecommendedOrders} from '../domains/recomendedOrder.model';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class HttpService {
  private managers_url = 'http://srv-dev-01.kt.local/Hryshenchuk/hs/ut/managers/';
  private schedule_url = 'http://erp.kt.ua/API_UT/hs/ut/baseSchedulers/';
  private auth_url = 'https://webwork.kt.ua:11443/auth-firebase-user';

  constructor(private http: HttpClient, private convert: ConvertService, private firebase: AngularFireDatabase) {
  }

  getRecommendedOrders(): RecommendedOrders[] {
    const recommendedOrders: RecommendedOrders[] = [];
     this.firebase.list('/partnerPointRecommendedOrders').valueChanges().subscribe(res => {
       this.convert.intoRecommendedOrders(res, recommendedOrders);
    });
    return recommendedOrders;
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
      })),
    );
  }

  sendUserCredentials(email: string, password: string) {
    let headers = new HttpHeaders();
    headers =  headers.append('Authorization', 'Basic ' + btoa(email + ':' + password));
    return this.http.get(this.auth_url, {headers, responseType: 'text'});
  }

  check() {
    return this.http.get(this.auth_url);
  }

}


