import {Component, Input, OnInit, HostBinding} from '@angular/core';
import { Manager } from '../../domains/manager.model';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  @Input() manager: Manager[];
  @Input() index: number;
  @HostBinding('attr.class') cssClass = 'col-lg-12 col-md-12 col-sm-12 col-xs-12';
  // dataSource = this.manager;
  // displayedColumns: string[] = ['Manager Name'];

  constructor() { }

  ngOnInit() {}

}





