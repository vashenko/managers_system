import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  private myArray: object[] = [];
  constructor() {

    console.log()
  }

  ngOnInit() {
    this.myArray = [
    {
      name: "Apple",
      color: "Green"
    },
    {
      name: "Banana",
      color: "Yellow"
    },
    {
      name: "Grape",
      color: "Green"
    },
    {
      name: "Melon",
      color: "Yellow"
    },
    {
      name: "Orange",
      color: "Orange"
    }
  ];
    console.log(this.myArray);
  }

}





