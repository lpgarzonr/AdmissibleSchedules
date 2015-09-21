describe("scheduleBuilder", function() {
  var testUtils;
  var inputBuilder;
  var scheduleBuilder;

  beforeEach(function() {
    testUtils = require('../helpers/testUtils.js');
  	inputBuilder = require('../../inputOutputBuilder/inputBuilder.js');
    scheduleBuilder = require('../../scheduleBuilder/scheduleBuilder.js').schedulerBuilder;
    scheduleTable = require('../../scheduleBuilder/scheduleBuilder.js').ScheduleTable;
  	procesToSchedule = inputBuilder.buildSmallProcessToSchedule();
  });

  it("should provide a list with all the possible schedules from a given process", function() {
    var result = scheduleBuilder.getSchedules(procesToSchedule);
    var shedulesActivitiesIds = testUtils.getSchedulesActivitiesIds(result);
    expect(shedulesActivitiesIds).toEqual(['1234','2134','1324','2134']);
  });

  it("should return a no empty schedules list from a given process", function() {
    var result = scheduleBuilder.getSchedules(procesToSchedule);
    var shedulesActivitiesIds = testUtils.getSchedulesActivitiesIds(result);
    expect(shedulesActivitiesIds.length > 0).toBeTruly;
  });
});


describe("scheduleBuilder: ScheduleTable", function() {
  var testUtils;
  var inputBuilder;
  var scheduleBuilder;
  var process;
  var activityOne;
  var activityTwo;
  var activityThree;
  var scheduleTable;

  beforeEach(function() {
    testUtils = require('../helpers/testUtils.js');
    inputBuilder = require('../../inputOutputBuilder/inputBuilder.js');
    ScheduleTable = require('../../scheduleBuilder/scheduleBuilder.js').ScheduleTable;
    procesToSchedule = inputBuilder.buildSmallProcessToSchedule();
    process = require('../../process/process.js');
    activityOne = new process.Activity(1);
    activityTwo = new process.Activity(2);
    activityThree = new process.Activity(3);
    activityFour = new process.Activity(4);
    activityThree.addDependency(activityOne);
    scheduleTable = new ScheduleTable();
  });

  it("should concat a given activity to the current list of activities", function() {
    scheduleTable.concatSubSchedules([[activityOne, activityTwo]]);
    scheduleTable.concatSubSchedules([[activityThree]]);
    var result = scheduleTable.getSchedules();
    var shedulesActivitiesIds = testUtils.getSchedulesActivitiesIds(result);
    expect(shedulesActivitiesIds).toEqual(['123']);
  });
});