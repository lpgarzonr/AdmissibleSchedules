var process = require('../process/process.js');

var a1 = new process.ActivitySimple(1);
var a2 = new process.Activity(2);

console.log("--Module---");
a2.addDependency('da1');
console.log(a2.getDependencies());
console.log(a2.id);
console.log(a2.dependencies);
