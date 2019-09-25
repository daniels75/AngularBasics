import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {filter, map} from 'rxjs/operators'

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
    const customObservable:Observable<any> = Observable.create(observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count++);
          if (count == 5) {
            observer.complete();
          }
          if (count > 3 ) {
            observer.error(new Error('Error appears - count is: ' + count));
          }
        }, 1000)
    })

    const mapObserver:Observable<any> = customObservable.pipe(filter((data:number) => {
       return data > 1 ?  true :  false;
    }), map((data: number) => {
      return "round: " + (data + 1);
    }));

    this.subscription2 = mapObserver.subscribe(
      (data) => console.log(data),
      (error) => console.log(error.message),
      () => console.log('Completed')
    );
  }

  ngOnDestroy(): void {
    // 1st example
    // this.1subscription.unsubscribe();

    // 2nd example
    this.subscription2.unsubscribe();
  }



}
