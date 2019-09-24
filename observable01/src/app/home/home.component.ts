import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription1: Subscription;
  private subscription2: Subscription;
  constructor() { }

  ngOnInit() {
    // 1st example
    this.subscription1 = interval(1000).subscribe((value) => {
      // console.log(value)
    });

    // 2nd example
    const customObservable = Observable.create(observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count++);
        }, 1000)
    })

    this.subscription2 = customObservable.subscribe((value) => console.log(value));
  }

  ngOnDestroy(): void {
    // 1st example
    // this.1subscription.unsubscribe();

    // 2nd example
    this.subscription2.unsubscribe();
  }



}
