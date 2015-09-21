var _ = require("./node_modules/underscore/underscore.js");
var inputBuilder = require('./inputOutputBuilder/inputBuilder.js');
var outputBuilder = require('./inputOutputBuilder/outputBuilder.js');
var scheduleBuilder = require('./scheduleBuilder/scheduleBuilder.js').schedulerBuilder;

//TODO: Build the process and activities automatically from a given input string
var processToSchedule = inputBuilder.buildProcessToSchedule();
var schedules = scheduleBuilder.getSchedules(processToSchedule);
outputBuilder.printSchedules(schedules);