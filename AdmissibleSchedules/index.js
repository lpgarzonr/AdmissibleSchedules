var _ = require("./node_modules/underscore/underscore.js");
var inputBuilder = require('./inputOutputBuilder/inputBuilder.js');
var scheduleBuilder = require('./scheduleBuilder/scheduleBuilder.js').schedulerBuilder;
var processGraph = inputBuilder.buildProcessToSchedule('InputString');

scheduleBuilder.buildSchedules(processGraph);