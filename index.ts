import { of, Observable, from, timer, ObservableInput } from 'rxjs';
import {
  filter,
  debounce,
  finalize,
  take,
  map,
  reduce,
  merge
} from 'rxjs/operators';

/* 
console.log('%c //', 'color: orange');
console.log('%c //', 'color: white');
console.log('%c //', 'color: green');
console.log('%c //', 'color: yellow');
console.log('%c //', 'color: purple');
console.log('%c //', 'color: red');
*/

console.log('\n');
console.log('%c ////////', 'color: orange');
console.log('%c // Cas simple avec next', 'color: orange');
console.log('%c ////////', 'color: orange');

/*///////////////////////
////////////////////////*/

const simpleNext$ = new Observable(subscriber => {
  subscriber.next('Hello');
  subscriber.next('Observable');
  subscriber.next(2);
  const array = [1, 2, 3, 4];
  array.forEach(number => {
    subscriber.next(number);
  });
  // subscriber.error();
  subscriber.next([1, 2, 3, 4]);
  subscriber.complete();
});

simpleNext$.subscribe(
  response => {
    console.log('%c ' + response, 'color: white');
  },
  () => {
    console.log('%c AIE AIE AIE', 'color: white');
  },
  () => {
    console.log('%c it is done');
  }
);

/*///////////////////////
////////////////////////*/

console.log('\n');
console.log('%c ////////', 'color: orange');
console.log('%c // PIPE ', 'color: orange');
console.log('%c ////////', 'color: orange');

const myNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const streamOfNumber$ = from(myNumbers);

console.log('%c At the beginning i have this array ' + myNumbers, 'color: red');
console.log('\n');

/*///////////////////////
////////////////////////*/

console.log(
  '%c Filtering with .pipe(filter((num: number) => num % 2 !== 0))',
  'color: green'
);
streamOfNumber$
  .pipe(filter((num: number) => num % 2 !== 0))
  .subscribe(response => {
    console.log('%c ' + response, 'color: green');
  });
console.log('\n');

/*///////////////////////
////////////////////////*/

console.log('%c using map((num) => 100 + num)', 'color: yellow');
streamOfNumber$
  .pipe(filter((num: number) => num % 2 === 0))
  .pipe(map(num => 100 + num))
  .subscribe(response => {
    console.log('%c ' + response, 'color: yellow');
  });
console.log('\n');

/*///////////////////////
////////////////////////*/

console.log('%c Using debounce(() => timer(300)))', 'color: yellow');
streamOfNumber$
  .pipe(filter((num: number) => num % 2 === 0))
  .pipe(debounce(() => timer(300)))
  .subscribe(response => {
    console.log('%c ' + response, 'color: yellow');
  });
console.log('\n');

/*///////////////////////
////////////////////////*/

const phrase = "Une phrase quand j'ai fini";

console.log('%c with finalize()', 'color: purple');
streamOfNumber$
  .pipe(finalize(() => console.log('%c ' + phrase, 'color: purple')))
  .subscribe(response => {
    console.log('%c ' + response, 'color: purple');
  });
console.log('\n');

/*///////////////////////
////////////////////////*/

console.log('%c reduce((acc, val) => acc + val)', 'color: green');
const example = streamOfNumber$.pipe(reduce((acc, val) => acc + val));
//output: Sum: 10'
const subscribe = example.subscribe(val =>
  console.log('%c Sum:' + val, 'color: green')
);
console.log('\n');

/*///////////////////////
////////////////////////*/

console.log('%c multiple operator %2 and +100', 'color: green');
streamOfNumber$
  .pipe(
    filter(num => num % 2 === 0),
    map(num => num + 1000),
    finalize(() => console.log('%c ' + phrase, 'color: green'))
  )
  .subscribe(response => {
    console.log('%c ' + response, 'color: green');
  });
console.log('\n');

/*///////////////////////
////////////////////////*/

const myAlphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
const myAlphabet$ = from(myAlphabet);

console.log('%c MERGE d\observable', 'color: yellow');
streamOfNumber$.pipe(merge(myAlphabet$)).subscribe(response => {
  console.log('%c ' + response, 'color: yellow');
});
console.log('\n');
