import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin} from 'rxjs';
import { map } from 'rxjs/operators';
import {ConvertService} from './convert.service';
import {RecommendedOrders} from '../domains/recomendedOrder.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';

@Injectable()
export class HttpService {
  private managers_url = 'http://srv-dev-01.kt.local/Hryshenchuk/hs/ut/managers/';
  private schedule_url = 'http://srv-dev-01.kt.local/Hryshenchuk/hs/ut/baseSchedulers/';
  private auth_url = 'https://webwork.kt.ua:11443/auth-firebase-user';
  token: string;

  constructor(private http: HttpClient, private convert: ConvertService, private firebase: AngularFireDatabase,
              private authService: AuthService) {
    this.authService.getUserTokenId().then((tokenId) => this.token = tokenId);
  }

  getRecommendedOrders(): RecommendedOrders[] {
    const recommendedOrders: RecommendedOrders[] = [];
     this.firebase.list('/partnerPointRecommendedOrders').valueChanges().subscribe(res => {
       this.convert.intoRecommendedOrders(res, recommendedOrders);
    });
    return recommendedOrders;
  }

  getApiData() {
    return forkJoin(
      this.http.get(this.schedule_url).pipe(map(res => {
        return this.convert.intoScheduleItems(res);
      })),
      this.http.get(this.managers_url).pipe(map(res => {
        return this.convert.intoManagers(res);
      }))
    );
  }

  sendUserCredentials(email: string, password: string) {
    let headers = new HttpHeaders();
    headers =  headers.append('Authorization', 'Basic ' + btoa(email + ':' + password));
    return this.http.get(this.auth_url, {headers, responseType: 'text'});
  }
}


