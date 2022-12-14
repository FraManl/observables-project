import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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
        // observer here knows when count increments, it observes the observable
        observer.next(count);

        if (count == 8) {
          // completes the observable, it will come to an halt
          observer.complete();
        }
        if (count > 3) {
          // throws new error object and STOPS/CANCELS the observable, automatically, it dies
          observer.error(new Error('Count greater than 3 !!'));
        }
        count++;
      }, 1000);
    });

    // build a chain of pipes
    this.firstObsSubscription = customIntervalObservable
      // use pipe operator to filter the incoming data!
      // data is the current emitted/subscribe value
      .pipe(
        // returns true/false
        filter((data: number) => {
          return data > 2;
        }),
        map((data: number) => {
          return 'Round' + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        // 3rd handler is for the completion function
        () => {
          console.log('completed!');
        }
      );
  }

  // unsubscribe the observable
  // remember : observables provided by angular = automatically unsubscribe, but not custom ones
  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
