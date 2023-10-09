'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value} `);
// });

/////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// movements.forEach(function (mov, i, arr) {
//   mov > 0
//     ? console.log(`Movement ${i + 1}: you've deposited ${mov}`)
//     : console.log(`Movement ${i + 1}: you've withdrew ${mov}`);
// });

/////////////////////////////////////////////////

//Bankist
// Generate movement of current account

const displayMovements = function (movements, sorted = false) {
  const movs = sorted ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Generate username for each user
const userName = function (names) {
  const abbrUserName = [];
  names.forEach(function (name) {
    const uName = name.owner;
    const n = uName
      .toLowerCase()
      .split(' ')
      .map(item => item[0])
      .join('');

    name.username = n;
    abbrUserName.push(n);
  });

  return abbrUserName;
};

userName(accounts);

//Display account balance
const calcPrintAccountBal = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 10)
    .filter(mov => mov >= 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//Login function

//Display UI
const updateUI = function () {
  //Calculate balance

  console.log('UI is called');
  calcPrintAccountBal(currentAccount);

  //display movements
  displayMovements(currentAccount.movements);

  //calculate summmary
  calcDisplaySummary(currentAccount);
};

let currentAccount;

// LOgin user
btnLogin.addEventListener('click', function (e) {
  //Prevent Default
  e.preventDefault();

  console.log('login .....');

  //find current account
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  //display ui and message
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back,${
      currentAccount.owner.split(' ')[0]
    }`;

    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    containerApp.style.opacity = 100;

    updateUI();
  }
});

//Transfer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const TransAmount = Number(inputTransferAmount.value);
  const destinationAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    TransAmount > 0 &&
    destinationAccount &&
    currentAccount.balance >= TransAmount &&
    currentAccount.username !== destinationAccount
  ) {
    //Deduct transfer from account
    currentAccount.movements.push(-TransAmount);

    //Credit the account stated
    destinationAccount.movements.push(TransAmount);

    //update UI
    updateUI();
  }
});

// Delete account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => currentAccount.username === acc.username
    );
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

// Request a loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
  }
  updateUI();
  inputLoanAmount.value = '';
});

let isSorted = false;
//sort movements
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('successful');
  displayMovements(currentAccount.movements, !isSorted);
  isSorted = !isSorted;
});

/* **************************************************
    ***************** LESSON ***********************
  ***************************************************


*/

// console.log(account1)
// console.log(account4)

// Data Manipulation methods
/*
const depositsFor = function(account){
 return account.movements.filter(items => items > 0);
}

console.log(depositsFor(account1));

const withdrawFor = function(account){
 return  account.movements.filter(item => item < 0);
}

console.log(withdrawFor(account1));

const accountBalance = function(account){
  return account.movements.reduce((acc, cur) =>  acc + cur , 0);
}
console.log(accountBalance(account1));
*/
/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const kate_data = [4, 1, 15, 8, 3];
const julian_data = [10, 5, 6, 1, 4];

const checkDogs = function (arr1, arr2) {
  const fDogs = arr1.slice(1, 3);
  const dogsArr = [...fDogs, ...arr2];

  dogsArr.forEach((dogAge, i) => {
    dogAge >= 3
      ? console.log(
          `Dog number ${i + 1} is an adult, and is ${dogAge} years old`
        )
      : console.log(
          `Dog number ${i + 1} is a puppy, and is ${dogAge} years old`
        );
  });
};

// checkDogs(kate_data, julian_data);


// Maps

const eurotoUsd = 1.1;
const movement = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movementUSD = movement.map((mov) => mov * eurotoUsd) ;
console.log(movementUSD);


*/

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(dogAge =>
    dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4
  );
  const adult = humanAge.filter(age => age >= 18);
  const average = adult.reduce((acc, cur) => acc + cur, 0) / adult.length;

  return average;
};

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

const calcAverageHumanAges = function (ages) {
  const humanAge = ages
    .map(dogAge => (dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4))
    .filter(age => age >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  return humanAge;
};

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);
const forFind = function (accs) {
  for (const account of accs) {
    console.log(account);
    if (account.owner === 'Jonas Schmedtmann') {
      return account;
    }
  }
};

const someFunction = mov => mov > 0;
const fMovs = account1.movements.filter(someFunction);
const sMovs = account1.movements.some(someFunction);
const amovs = account1.movements.every(someFunction);
// console.log(fMovs, sMovs,amovs);
// console.log(forFind(accounts));

//flat

// const allMovements = accounts.map(acc => acc.movements).flat().reduce((acc, cur) => acc + cur);
const allMovements = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur);
// console.log(allMovements);

const arr4 = [5, 2, 4, 1, 15, 8, 3];
arr4.sort((a, b) => b - a);
// console.log(arr4);

// console.log(calcAverageHumanAges([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAges([16, 6, 10, 5, 6, 1, 4]));

//array from

const x = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 100 + 1)
);
// console.log(x);

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: re. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
const recommended = function () {
  dogs.forEach(el => {
    el.recommendedFood = Math.floor(el.weight ** 0.75 * 28);

    //convert to 2dp
    // el.recommendedFood = `${parseFloat(el.recommendedFood).toFixed(2)} kg`;
    // console.log(el.recommendedFood);
  });
};
recommended();

//challange 2
// Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, `so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

const findDogOWner = function (owner) {
  dogs.forEach(el => {
    if (el.owners.includes(owner)) {
      // current > (recommended * 0.90) && current < (recommended * 1.10)
      const recoInt = el.recommendedFood;
      // console.log(el.curFood, recoInt * 1.1);
      el.curFood > recoInt * 1.1
        ? console.log(`${owner}'s Dog eats too much`)
        : el.curFood < recoInt * 0.9
        ? console.log(`${owner}'s Dog eats to little`)
        : console.log(`${owner}'s Dog eats moderately`);
    }
  });
};

// console.log(dogs)

findDogOWner('Michael');

// Challenge three
// Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

const createRecomFoodCategory = function (arr) {
  let ownersEatTooMuch = [];
  let ownersEatTooLittle = [];
  arr.forEach(el => {
    if (el.curFood > el.recommendedFood * 1.1) {
      ownersEatTooMuch.push(...el.owners);
    } else if (el.curFood < el.recommendedFood * 0.9) {
      ownersEatTooLittle.push(...el.owners);
    }
  });
  // console.log(ownersEatTooLittle, 'to little');
  // console.log(ownersEatTooMuch, 'too much') ;

  return [ownersEatTooLittle, ownersEatTooMuch];
};

// console.log(createRecomFoodCategory(dogs));

// challenge four
// Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
const stringLog = `${createRecomFoodCategory(dogs)[1].join(
  ' and '
)} dog's eat Too much and ${createRecomFoodCategory(dogs)[0].join(
  ' and '
)} eats too little`;

// console.log(stringLog);

// challenge five
// Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
const exactRecFoodDogs = function (arr) {
  const answer = arr.some(el => {
    // console.log(el.curFood, recoInt * 1.1);
    el.curFood > el.recommendedFood * 1.1 &&
      el.curFood < el.recommendedFood * 0.9;
  });
  return answer;
};

// console.log(dogs)

// console.log(exactRecFoodDogs(dogs));

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];



// challenge eight 
// Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
