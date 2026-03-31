//write the funtions to export add mutliply, substract, devide in a single file and export them as a module

//add   
export function add(a, b) {
  return a + b;
}
//multiply
export function multiply(a, b) {
  return a * b;
}
//substract
export function substract(a, b) {
  return a - b;
}
//devide
export function devide(a, b) {
  if (b === 0) {    
    throw new Error("Cannot divide by zero");
    }
    return a / b;
}