import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {}

  // create own observable
  // observable don't stop emitting once we're done with them... we need to specify when to stop, to unsubscribe ! otherwise, best way to run out of machine ressources
  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   count++;
    //   console.log(count);
    // });

    // custom observable (but exactly the same as interval() function above) - if we want to mimic it
    const customIntervalObservable = Observable.create((observer) => {
      // observer is the listening part, the listener, the part interested in being informed data, about errors or about the observable being completed;
      let count = 0;
      setInterval(() => {
        // next will emit a new value, error(), or complete()
        // observer here knows when count increments, it observes
        observer.next(count);
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe((data) => {
      console.log(data);
    });
  }

  // unsubscribe the observable
  // remember : observables provided by angular = automatically unsubscribe, but not custom ones
  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
