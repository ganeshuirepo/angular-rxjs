import { Component, OnInit } from '@angular/core';
import {defer, fromEvent, interval} from 'rxjs';

@Component({
  selector: 'app-rxjs-create',
  templateUrl: './rxjs-create.component.html',
  styleUrls: ['./rxjs-create.component.css']
})
export class RxjsCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const clicksOrInterval = defer(function () {
  return Math.random() > 0.5
    ? fromEvent(document, 'click')
    : interval(1000);
});
clicksOrInterval.subscribe(x => console.log(x));
  }

}