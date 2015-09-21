describe("scheduleBuilder: ScheduleTable", function() {
  var inputBuilder;
  var scheduleBuilder;

  beforeEach(function() {
  	inputBuilder = require('../../inputOutputBuilder/inputBuilder.js');
    scheduleBuilder = require('../../scheduleBuilder/scheduleBuilder.js').schedulerBuilder;
    scheduleTable = require('../../scheduleBuilder/scheduleBuilder.js').ScheduleTable;
  	procesToSchedule = inputBuilder.buildSmallProcessToSchedule();
  	console.log(procesToSchedule);
  });

  it("should return the activities dependencies after inserting some", function() {
    expect(true).toBeTruely;      
  });

/*
  it("should assing a tree level when inserting a dependency", function() {
	  activityOne.addDependency(activityTwo);
    expect(activityOne.level === 1 && activityTwo.level === 0).toBeTruely;      
  });
  
  it("should defind the activity properties when an activity is created", function() {
	 expect(activityOne.isMovable && activityOne.id && activityOne. dependencies && activityOne.level).toBeDefined();
  });*/
});
