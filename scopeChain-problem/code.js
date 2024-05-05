//tricky problem
for (var i = 0; i < 5; i++) {
    //the anonymous function is placed on the event queue in the event loop before executing!
    //and since i is declared using var, it is not block-scoped
    //by the time when we start to "call" the anonymous function (essentially enclosures in JS), i has already become 5 in the scope chain  
    setTimeout(() => {
        console.log(i++);
    }, 4000);
}
console.log(i);
//therefore, we'll output 5, and after more than 4 sceonds (because the timeout starts after the call stack executions finish) output 5, 6, 7, 8, 9
//basically execute the event queue after the call stack


//we can also use an IIFE (Immediately Invoked Function Expression) to get the "desired" output
for (var i=0; i<5; i++){
    //we use IIFE to create a function execution context on call stack to set the scope chain of x, which refers to the value of the argument i that is passed in (stored)
    (function(x){
        setTimeout(() => {
            console.log(x);
        }, 4000);
    })(i);
}
console.log(i);
//this time we would get 5, 0, 1, 2, 3, 4, 
//because we use IIFE to create an execution context and set the scope chain, 
//which basically stores the i in each iteration!!



//we can also use "let", which is block scoped
for (let i = 0; i < 5; i++) {
    //therefore, such declaration can "localize the variable to each iteration"!!
    setTimeout(() => {
        console.log(i++);
    }, 4000);
}
//the result would be 0, 1, 2, 3, 4