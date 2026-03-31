//factorial of eaech number in an array
const numbers = [1, 2, 3, 4, 5]



const factorial = numbers.map(num =>{
let fact = 1
for (let i = 1; i<=num; i++){

    fact *=i
}
return fact

})
console.log(factorial)


//  Using filter to get marks greater than or equal to 60
const marks = [45, 67, 89, 34, 90, 56];
const passedMarks = marks.filter(mark => mark >= 60);
console.log("Passed Marks:", passedMarks); // [67, 89, 90]
 
// Using reduce to calculate the sum of numbers
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log("Sum of Numbers:", sum); // 15
 
// challenge: from below array, create a new array which contains square of even numbers only
// const numbers = [1, 2, 3, 4, 5];
// expected output: [4, 16]

const squaredEvenNumbers = numbers.filter(num => num % 2 === 0).map(num => num * num);
console.log("Squared Even Numbers:", squaredEvenNumbers); // [4, 16] 


