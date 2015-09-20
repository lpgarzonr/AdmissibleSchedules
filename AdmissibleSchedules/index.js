var _ = require("./node_modules/underscore/underscore.js");
var inputBuilder = require('./inputBuilder/inputBuilder.js');
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
console.log(schedulesTable.schedules);

function buildSchedules(processGraph){

	var activities = processGraph.getActivities();
	var independentInitialActivities = findInitialActivities(activities);

	//schedulesTable.schedules = getActivitiesPermutation(independentInitialActivities);
	
	var treeActivitiesByLevel = treeActivitiesBuilder.getTreeActivities(activities);

	//encontrar de las que dependo
	treeActivitiesByLevel.forEach(function(activitiesInLevel){
		var permutedActivities = getActivitiesPermutation(activitiesInLevel[0]);
		schedulesTable.concatTailSchedules(permutedActivities);
		activitiesInLevel.forEach(function(activity){		
		});		
	});
	//encontrar de las que dependo
	/*independentInitialActivities.forEach(function(initialActivity){
		var nextActivities = findNextActivities(initialActivity, activities);
		nextActivities.forEach(function(nextActivity){
			if(nextActivity.getDependencies().length === 1){
				schedulesTable.addActivityToAllSchedules(nextActivity);
			}
			else{}
		});		
	});*/
};

function findInitialActivities(activities){
	var initialActivities = activities.filter(function (activity){
		return (activity.getDependencies().length === 0);
	});
	return initialActivities;
};

function findNextActivities(originActivity, activities){
	//for (var idxAct = 0; idxAct < initialActivities.length; idxAct++) {
	var nextActivities = activities.filter(function (activity){
				return _.contains(activity.getDependencies(), originActivity);
		});
	return nextActivities;
	//}
};

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

