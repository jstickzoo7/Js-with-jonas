'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  nextmeal: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// const[starterCourse, mainCourse] = restaurant.nextmeal(2,2) ;
// console.log(starterCourse, mainCourse)

// const {name:rNmae,mainMenu, categories:foodCat, openingHours:{thu:thursday, fri:friday, sat:saturday}} = restaurant ;
// console.log(name,categories, mainMenu);
// console.log(rNmae,foodCat);
// const test = [...mainMenu] ;
// console.log(mainMenu);
// test.push('Amala');
// console.log(test);

// SPREAD OPERATOR
// const newArr = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(newArr);

// const [badArr, ...otherItems] = newArr ;
// console.log(badArr, otherItems);

// for (let [num, item] in newArr.entries()) {
//   console.log(num + 1, item);
//   console.log(12);
// }

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrusssia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Makimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4.0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  playerScoreCount: function () {
    let objPLayerSCored = {};

    for (const player of this.scored) {
      objPLayerSCored[player] === undefined
        ? (objPLayerSCored[player] = 1)
        : (objPLayerSCored[player] += 1);
    }
    return objPLayerSCored;
  },
};

// 4TH challenge
// console.log(game.playerScoreCount());

for (const [num, playerName] of game.scored.entries()) {
  // console.log(`Goal ${num + 1}: ${playerName}`);
}

const [...value] = Object.values(game.odds);
let sum = 0;
value.forEach((sum, iter) => {
  sum += iter;
});
// console.log(sum / 3)

// console.log(Object.values(game.odds));

// const {team1, x:draw, team2} = game.odds ;
// const avgOdd = (team1 + draw + team2) / 3 ;
// console.log(avgOdd )

//3RD problem solution
// let values = Object.values(game.odds)
// for (let [position, value] of values.entries()) {
//   if(position + 1 === 1) console.log(`odd of ${game.team1}: ${value}`);
//   if(position + 1 === 2) console.log(`odd of draw : ${value}`);
//   if(position + 1 === 3) console.log(`odd of victory  ${game.team2} : ${value}`);
// }

// for (const {team1, x:darw, team2} of game.odds) {
//   console.log(team1,darw,team2);
// }
// console.log(game.odds);

const arr = ['james', 'adebayo', 'james', 'Femi', 'adebayo'];

const box = new Map(Object.entries(game));

//  console.log(box);
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//challenge one
const noDuplicateEvent = new Set();
for (const [times, events] of gameEvents) noDuplicateEvent.add(events);
const eventArr = [...noDuplicateEvent];
// console.log(eventArr);

//challenge two
gameEvents.delete(64);
// console.log(gameEvents)

// challenge three
let gameTimeDiff = 0;
let avg = 0;
for (const [times] of gameEvents) {
  avg += times - gameTimeDiff;
  gameTimeDiff = times;
}
avg /= gameEvents.size;

// console.log(`An event happened, on average, every ${avg} minutes`);

// challenge four
// for (const [time, gEvents] of gameEvents)
//   time <= 45
//     ? console.log(`[FISRT HALF] ${time}: ${gEvents}`)
//     : console.log(`[SECOND HALF] ${time}: ${gEvents}`);

const capitalizeName = function (name) {
  const names = name.split(' ');
  for (let n in names) {
  }
};

// capitalizeName('awelewa james')

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅ 
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

let button = document.getElementsByTagName('button')[0];

button.addEventListener('click', function () {
  let textArea = document.getElementsByTagName('textarea')[0].value;
  const textArray = textArea.split('\n');
  console.log(textArray);
  console.log(textArray.length);

  for (let index = 0; index < textArray.length; index++) {
    if (textArray[index].includes('_')) {
      let c = textArray[index].trim().toLowerCase();
      let d =
        c.slice(0, c.indexOf('_')) +
        c[c.indexOf('_') + 1].toUpperCase() +
        c.slice(c.indexOf('_') + 2);
      console.log(`${d.padEnd(20, ' ')}${'✅'.repeat(index + 1)}`);
    };
  }

  //   console.log(formattedData)
});
