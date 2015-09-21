describe("process: Activity", function() {
  var process;
  var activityOne;
  var activityTwo;

  beforeEach(function() {
  	process = require('../../process/process.js');
	activityOne = new process.Activity(1);
	activityTwo = new process.Activity(2);
  });

  it("should return the activities dependencies after inserting some", function() {
	activityOne.addDependency(activityTwo);
    var result = activityOne.getDependencies();
    expect(result).toEqual([activityTwo]);      
  });

  it("should assing a tree level when inserting a dependency", function() {
	activityOne.addDependency(activityTwo);
    expect(activityOne.level === 1 && activityTwo.level === 0).toBeTruely;      
  });
  
  it("should defind the activity properties when an activity is created", function() {
	expect(activityOne.isMovable && activityOne.id && activityOne. dependencies && activityOne.level).toBeDefined();
  });
});

describe("process: Process", function() {
  var process;
  var activityOne;
  var activityTwo;
  var processToSchedule;

  beforeEach(function() {
  	process = require('../../process/process.js');
	activityOne = new process.Activity(1);
	activityTwo = new process.Activity(2);
	processToSchedule = new process.Process();
  });

  it("should return the process activities after inserting some", function() {
	processToSchedule.addActivity([activityOne,activityTwo]);
    var result = processToSchedule.getActivities();
    expect(result).toEqual([activityOne, activityTwo]);    
  });

  it("should return the process activities in a unique vector although several different activities vectors have been inserted", function() {
	processToSchedule.addActivity([[activityOne],[activityTwo]]);
    var result = processToSchedule.getActivities();
    expect(result).toEqual([activityOne, activityTwo]);    
  });
});