import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

// Async Testing Examples
describe("Async Testing Examples", () => {
  // With doneFn callback we can use it to assert the result of the async operation
  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {
    let test = false;
    expect(test).toBe(false);
    // Not a good practice to use setTimeout in tests
    setTimeout(() => {
      test = true;
      expect(test).toBe(true);
      done();
    }, 1000);
  });

  // With fakeAsync we can use tick() to advance the async operation
  it("Asynchronous test example - setTimeout()", fakeAsync(() => {
    let test = false;
    expect(test).toBe(false);

    setTimeout(() => {
      test = true;
      expect(test).toBe(true);
    }, 1000);

    // tick(1000) will advance the async operation by 1000ms and can be used to assert the result only in a fakeAsync test
    tick(1000);

    setTimeout(() => {
      test = false;
      expect(test).toBe(false);
    }, 2000);

    // flush() will advance the async operation by the remaining time and can be used to assert the result only in a fakeAsync test
    flush();
  }));

  it("Asynchronous test example - plain Promise", fakeAsync(() => {
    let test: boolean = false;
    console.log("Creating Promise");

    Promise.resolve()
      .then(() => {
        console.log("Promise first then() evaluated");

        test = true;
        return Promise.resolve();
      })
      .then(() => {
        console.log("Promise second then() evaluated");
      });

    // flushMicrotask() will flush the microtask queue and can be used to assert the result only in a fakeAsync test
    flushMicrotasks();

    console.log("Running test assertions");

    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example - Promises + setTimeout()", fakeAsync(() => {
    let counter: number = 0;
    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);
    // flushMicrotasks to finish promises
    flushMicrotasks();

    expect(counter).toBe(10);
    // tick to finish setTimeout
    tick(500);

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);
  }));

  // TESTING OBSERVABLES
  it("Asynchronous test example - Observables", fakeAsync(() => {
    let test: boolean = false;
    console.log("Creating Observable");
    // creating an observable that emits a value after 1 second
    const test$ = of(true).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    tick(1000);

    expect(test).toBe(true);
  }));
});
