'use strict';
/* 
A confusing point for developers coming from different languages is the way variable scope
behaves in JavaScript.

using nodemon to debug 
*/

{
    // local variable 
    var a = "can be called outside block ";
}
// local variable a can be adressed outside the scope
console.log(a);

//workaround in  ES5 IIFE (Immediately Invoked Function Expression): 
function hello() {
    var b = "function";
    for (var i = 0; i < 5; i++) {
        (function () {
            var b = "block";
        })();
    }
    console.log(b);
}
hello(); // function we call immediatly after defining it same as block level scope
// Typescript: 
{
    let b = 'local block';
}
// console.log(b); // will give a ReferenceError as it's not defined
function hello2() {
    var b = "FUNCTION 2";
    for (var i = 0; i < 5; i++) {
        let b = "block";
    }
    console.log(b);
}
hello2();

// let in for loops
var funcs = [];
for (var j = 0; j < 5; j += 1) {
var y = j;
funcs.push(function () { // object.push: push a variable into an array
console.log(y);
})
}
funcs.forEach(function (func) {
func()
});
/* 
expected output: 
0 1 2 3 4
actual output: 
5 5 5 5 5
The reason for this is that the variable y is not block level, it doesn’t only exist inside its enclosing {}
In fact it’s a global variable and by the time any of the functions are called it’s already been set to 5.
*/

// In the above example if we replace var y = i with let y = i then the variable y only exists inside
// it’s block, like so:
var funcs = [];
console.log('new array')
for (let i = 0; i < 5; i += 1) {

funcs.push(function () {
console.log(i);
})
}
funcs.forEach(function (func) {
func()
});
// Even though let i = 0 is strictly declared outside of the for block { }, any variables declared in the
// for loop expression with let has block level scope in the for loop.
