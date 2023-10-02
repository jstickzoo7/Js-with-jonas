'use strict';

const greet = greet => name => console.log(`${greet} ${name}`);

const flyEmirates = {
  airline: 'Fly Emirates',
  iataCode: 'FX',
  booking: [],
  book(flightNum, customerName) {
    console.log(
      `${customerName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.booking.push({ flight: `${this.iataCode}${flightNum}`, customerName });
  },
};

// flyEmirates.book(454, "jonas");
// console.log(flyEmirates)

const book = flyEmirates.book;

const nigeriaAirway = {
  airline: 'Nigeia Airway',
  iataCode: 'AX',
  booking: [],
};

// book.call(nigeriaAirway, 756, 'Dammy');
// console.log(nigeriaAirway)

const flightData = [756, 'Damilare'];
// book.apply(nigeriaAirway, flightData);
// book.call(nigeriaAirway, ...flightData)

const FxBook = book.bind(nigeriaAirway);
// FxBook(...flightData);

nigeriaAirway.plane = 300;
nigeriaAirway.buyPlane = function () {
  console.log(this);
  this.plane++;
  console.log(this.plane);
};

// document.querySelector('.buy').addEventListener('click',nigeriaAirway.buyPlane.bind(nigeriaAirway))
const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.2, 200));

const addVAT = taxFn => taxFn(0.23);
// console.log(addVAT(addTax));

// Challenge 1

const poll = {
  questions: [
    [0, 'javascript'],
    [1, 'python'],
    [2, 'Rust'],
    [3, 'C++'],
  ],
  answer: [0, 0, 0, 0],
  registerNewAnswer() {
    const userOption = Number(
      prompt(
        `What is your favourite programming language ? \n
      ${this.questions[0][0]}: ${this.questions[0][1]}\n
      ${this.questions[1][0]}: ${this.questions[1][1]}\n
      ${this.questions[2][0]}: ${this.questions[2][1]}\n
      ${this.questions[3][0]}: ${this.questions[3][1]}\n
      (Write option number)`
      )
    );
    userOption < this.answer.length && this.answer[userOption]++;
    this.displayResult();
    this.displayResult('string')
  },
  displayResult(type = 'array') {
    type === 'array'
      ? console.log(this.answer)
      : console.log(`Poll results are ${this.answer.join(',')}`);
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// console.log(poll.answer);
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/


(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
