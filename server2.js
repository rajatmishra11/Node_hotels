// var fs = require("fs");
// var os = require("os");

// var user = os.userInfo();
// console.log(user);
// console.log(user.usernamein);

// fs.appendFile("greeting.txt", "Hi" +user.username + "!" , () => {
//   console.log("file is saved");
// });

//importing linked js file ->
const notes = require("./notes.js");
var age= notes.age;
console.log(age);
console.log("server file(notes.js) is available");
var result= notes.addNumber(23, 24);
console.log("Result of my age and notes age is " + result);
