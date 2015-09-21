var process = require('../process/process.js');

//TODO: Build the process and activities automatically from a given input string
//TODO: Avoid new following the recomedation given!!!
//TODO: I know this one is awfull, sorry about that :(
var a1 = new process.Activity(1);
var a2 = new process.Activity(2);
var a3 = new process.Activity(3);
var a4 = new process.Activity(4);
//var x = new process.Activity('x');
var a5 = new process.Activity(5);
var a6 = new process.Activity(6);
var a7 = new process.Activity(7);
var a8 = new process.Activity(8);
var a9 = new process.Activity(9);

a3.addDependency(a1);
//x.addDependency(a2);
a4.addDependency(a2);
a4.addDependency(a3);
//a4.addDependency(x);
a5.addDependency(a4);
a6.addDependency(a4);
a7.addDependency(a5);
a8.addDependency(a5);
a9.addDependency(a6);

function buildProcessToSchedule(input){
//TODO: Build the process and activities automatically from a given input string	
	var processToSchedule = new process.Process();
	//processToSchedule.addActivity([a1,a2,a3,a4,x]);
	processToSchedule.addActivity([a1,a2,a3,a4,a5,a6,a7,a8,a9]);
	return processToSchedule;
};
function buildSmallProcessToSchedule(input){
//TODO: Build the process and activities automatically from a given input string	
	var processToSchedule = new process.Process();
	processToSchedule.addActivity([a1,a2,a3,a4]);
	return processToSchedule;
};
module.exports.buildProcessToSchedule = buildProcessToSchedule;
module.exports.buildSmallProcessToSchedule = buildSmallProcessToSchedule;