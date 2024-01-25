// console.log("server file is running");

// // function add(a, b) {
// //   return a + b;
// // }

// // var add =(a, b)=>{return a+b}

// var add= (a, b) => a+b;

// var result = add(9, 3);
// console.log(result);
 
// (function(){
//   console.log("rajat ne  add kiya");
// })();

//----------------------------------------------------
// function callback()
// {
//     console.log('rajat is calling a callback');
// }

// //callback();
const add= function(a, b, callback)
{
    var result= a+b;
    console.log('addition is:   ' + result);
    callback();
}

// add(2, 6, callback);
//----------------------------------------------------

add(2, 3, ()=> console.log('add is done'));