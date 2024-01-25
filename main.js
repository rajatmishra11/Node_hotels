const objectToConvert ={
    name: "rajat",
    age: 23,
    wife: "Gauri",
    Profession: "Engineer"
}
//convert this data to json format->

const json= JSON.stringify(objectToConvert);
console.log(json);
console.log(typeof json);  //gives string

//comment added for testing purpose