import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})

export class GraphicsComponent implements OnInit {
  dataIsLoading = true;
  constructor( ) { }

  ngOnInit() {
    setTimeout(() => {
      this.dataIsLoading = false;
    }, 1500);
  }

}
