var _ = require("./node_modules/underscore/underscore.js");
var inputBuilder = require('./inputOutputBuilder/inputBuilder.js');
var outputBuilder = require('./inputOutputBuilder/outputBuilder.js');
var schedulerBuilder = require('./scheduleBuilder/scheduleBuilder.js');
var scheduleBuilder = require('./scheduleBuilder/scheduleBuilder.js');

var treeActivitiesBuilder = schedulerBuilder.treeActivitiesBuilder;

var processGraph = inputBuilder.buildProcessToSchedule('InputString');
var schedulesTable = new scheduleBuilder.ScheduleTable();
var buildAllSchedules = buildSchedules(processGraph);

/*function ScheduleTable(){ 
    this.schedules = [];
};

ScheduleTable.prototype = { 
    addActivityToAllSchedules : function addActivityToAllSchedules(activity) {
      this.schedules.forEach(function(schedule){
		schedule.push(activity);
	  });
    },
    addSchedule : function addSchedule(schedule) {
      this.schedules.push(schedule);
    },
    getSchedules : function getSchedules() {
    	return this.schedules;
    }
};
*/
//var schedulesTable = new ScheduleTable();

outputBuilder.printSchedules(schedulesTable.schedules);

function buildSchedules(processGraph){

	var activities = processGraph.getActivities();
	var treeActivitiesByLevel = treeActivitiesBuilder.getTreeActivities(activities);
	var activitiesInPrevLevel = 0;
	//encontrar de las que dependo
		treeActivitiesByLevel.forEach(function(activitiesInLevel){
			activitiesInLevel[0].forEach(function(activity){
				if (getActivitiesDependenciesInPreviousLevel(activity).length !== activitiesInPrevLevel)
				{
					activity.setMovable(true);
				}
			});	
			var permutedActivities = getActivitiesPermutation(activitiesInLevel[0]);		
			schedulesTable.concatTailSchedules(permutedActivities);
			activitiesInPrevLevel = activitiesInLevel[0].length;
		});	
};

function getActivitiesDependenciesInPreviousLevel(activity){
	var dependencies = activity.getDependencies();
	var level = activity.level;
	return dependencies.filter(function (activityDep){
		return (activityDep.level === level-1);
	});

}

function getActivitiesPermutation(activitiesToPermute) {
  var permutedScheduleActivities = [];
  function permute(activities, memo) {
    var cur, memo = memo || [];
    for (var idxAct = 0; idxAct < activities.length; idxAct++) {
      cur = activities.splice(idxAct, 1);
      if (activities.length === 0) {
        permutedScheduleActivities.push(memo.concat(cur));
      }
      permute(activities.slice(), memo.concat(cur));
      activities.splice(idxAct, 0, cur[0]);
    }
    return permutedScheduleActivities;
  }
  return permute(activitiesToPermute);
};

