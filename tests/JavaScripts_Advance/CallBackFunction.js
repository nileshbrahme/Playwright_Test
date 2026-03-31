
function calculate(num1, num2, callback) {
  return callback(num1, num2);
}
//add
function add(a, b) {
  return a + b;
}
//multiply
function multiply(a, b) {
  return a * b;
}
//substract
function substract(a, b) {
  return a - b;
}
//devide
function devide(a, b) {
  return a / b;
}   

//Use the calculate function with the add callback
const sum = calculate(10, 3, add);
console.log('Sum:', sum); 

//Use the calculate function with the multiply callback
const multiplyResult = calculate(10, 3, multiply);
console.log('Multiply:', multiplyResult);

//Use the calculate function with the substract callback
const substractResult = calculate(10, 3, substract);
console.log('Substraction:', substractResult);

//Use the calculate function with the devide callback
const devideResult = calculate(10, 2, devide);
console.log('Devide:', devideResult);







