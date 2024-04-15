"use strict";

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES-5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 3);

const flight = "LH234";
const jonas = {
  name: "Jonas Schmedtmann",
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Mr." + passenger.name;

  if (passenger.passport === 24739479284) {
    alert("Checked in");
  } else {
    alert("Wrong passport");
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(jonas);
checkIn(flight, jonas);

// Higher-order function

const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...other] = str.split(" ");
  return [first.toUpperCase(), ...other].join(" ");
};

// Function accepting callback function
const transformer = function (str, fn) {
  console.log(`Original : ${str}`);

  console.log(`Transforming: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer("Javascript is the best!", upperFirstWord);

transformer("Javascript is the best!", oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log("👋🏻");
};

document.body.addEventListener("click", high5);

["Jonas", "Martha", "Adam"].forEach(high5);

// Function that returns functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet("hey");
greeterHey("Jonas");
greeterHey("Martha");

greet("Hello")("Jonas");

const greet2 = (greeting) => (name) => console.log(`${greeting} ${name}`);

console.log(typeof greet2);
greet2("Hi")("Isaac");

// The call and apply Method
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  // book:function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );

    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name,
    });
  },
};

lufthansa.book(267, "Jonas Schmedtmann");
lufthansa.book(268, "Laughter");
console.log(lufthansa);

const flyEmirate = {
  airline: "Emirates",
  iataCode: "EM",
  bookings: [],
};

const book = lufthansa.book;
// book(23, 'Sarah') //Does not work

// Call Method
book.call(flyEmirate, 23, "Sarah");
console.log(flyEmirate);

book.call(lufthansa, 345, "Adeoluwa");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air",
  iataCode: "SA",
  bookings: [],
};

book.call(swiss, 675, "Lade");
console.log(swiss);

// Apply method
const flightData = [653, "Mark Cooper"];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);
console.log(swiss);

// Bind Method
const bookLH = book.bind(lufthansa);
const bookSA = book.bind(swiss);

const bookEM = book.bind(flyEmirate);

bookEM(23, "Steven Williams");

const bookEM23 = book.bind(flyEmirate, 23);
bookEM23("ISAAC");
bookEM23("Martra");

// With Eventlisteners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

//Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    console.log(value + value * rate);
  };
};

const addVAT2 = addTaxRate(0.23);
addVAT2(220);

addTaxRate(0.23)(100);

////// Immediately Invoked Function Expressio
const runOnce = function () {
  console.log("This will run every time it called");
};

(function () {
  console.log("This will never run again ");
  const isPrivate = 23;
})();

// console.log(isPrivate);

(() => console.log("This will ALSO never run again"))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);

/////////////////////////
// Closure
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

// g();
// f();

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Reassigning f Function

h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now Boarding all ${n} passengers`);
    console.log(`There are 3 groups each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);
