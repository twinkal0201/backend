//fundamental of js
// //Array anything can be in array in js
// | Method    | Returns New Array? | Purpose               |
// | --------- | ------------------ | --------------------- |
// | forEach() | ❌ No               | Loop through array    |
// | map()     | ✅ Yes              | Transform data        |
// | filter()  | ✅ Yes              | Select data           |
// | indexOf() | ❌ No               | Find element position |
// | Object    | N/A                | Store key-value pairs |

// Remember:

// forEach = iterate
// map = modify
// filter = select
// indexOf = search
// Object = key-value storage

var arr=[1,2,3,"abcd",{},true, function(){}, []];
const employees = [
    { id: 1, name: "Ram", salary: 30000 },
    { id: 2, name: "Shyam", salary: 50000 },
    { id: 3, name: "Mohan", salary: 70000 }
];

// forEach
employees.forEach(emp => {
    console.log(emp.name);
});

// map
const names = employees.map(emp => emp.name);
console.log(names);

// filter
const highSalary = employees.filter(emp => emp.salary > 40000);
console.log(highSalary);

// indexOf
console.log(names.indexOf("Shyam"));
//-1 not found in array


//find
var arr=[1,2,2,3,4]
var ans=arr.find(function(val){if(val===2) return val;})





//async js coding
    
//output:
// Ram
// Shyam
// Mohan

// ["Ram", "Shyam", "Mohan"]

// [
//  { id: 2, name: "Shyam", salary: 50000 },
//  { id: 3, name: "Mohan", salary: 70000 }
// ]

// 1