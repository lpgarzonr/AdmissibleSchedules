var _ = require("../node_modules/underscore/underscore.js");

var ScheduleTable = function(){ 
    this.schedules = [];
};

ScheduleTable.prototype = { 

    /*addActivityToAllSchedules : function addActivityToAllSchedules(activity) {
      this.schedules.forEach(function(schedule){
		schedule.push(activity);
	  });
    },*/
    //private
    getScheduleByMovingActivities : function getScheduleByMovingActivities(tmpSchedules) {
        tmpSchedules.forEach(function(tmpSchedule){
            var activityToMove = _.last(tmpSchedule);
            if(activityToMove.isMovable == true){
                var idx = getMaxIdxOfDependencies(tmpSchedules, activityToMove);
                console.log (idx);
            }               
        });
    },

    //given an activity returns the allowed index to move depending of the dependencies idx
    getMaxIdxOfDependencies : function getMaxIdxOfDependencies(schedule, activity) {
        var maxIdx = 0;
        activity.getDependencies().forEach(function(dependencyAct){
            dependencyIdx = _.indexOf(schedule, dependencyAct);
            if (maxIdx < dependencyIdx){
                maxIdx = dependencyIdx;
            }
        });
    },
    //public
    addSchedule : function addSchedule(schedule) {
      this.schedules.push(schedule);
    },

    getSchedules : function getSchedules() {
    	return this.schedules;
    },

    concatTailSchedules : function concatTailSchedules(tailSchedules){
      var tmpSchedules = [];
      if(this.schedules.length === 0){
          this.schedules = tailSchedules;
      }else {
          this.schedules.forEach(function(schedule){
            tailSchedules.forEach(function(tailSchedule){
                tmpSchedules.push(schedule.concat(tailSchedule));                
            });
          });
          //mueve elementos
          this.getScheduleByMovingActivities(tmpSchedules);
          this.schedules = tmpSchedules;
        }
    }
};

var treeActivitiesBuilder = function(){
  var treeActivitiesByLevels = [];

    function buildTreeActivitiesByLevels(activities) {  
        var treeActivitiesByLevelsObj = _(activities).groupBy(function(activity) {return activity.level;});
        treeActivitiesByLevels= _.map(treeActivitiesByLevelsObj,function(value, index) {
            return [value];
        });
        return treeActivitiesByLevels;
    };
  
  return {getTreeActivities: buildTreeActivitiesByLevels};  
}();

module.exports.ScheduleTable = ScheduleTable;
module.exports.treeActivitiesBuilder = treeActivitiesBuilder;