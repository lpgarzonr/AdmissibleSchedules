var _ = require("../node_modules/underscore/underscore.js");

var ScheduleTable = function(){ 
    this.schedules = [];
};

ScheduleTable.prototype = function(){ 
    function getScheduleByMovingActivities(tmpSchedules) {
    var newSchedules = [];
    var borrame = {};
    tmpSchedules.forEach(function(tmpSchedule){
        var activityToMove = _.last(tmpSchedule);
        if(activityToMove.isMovable == true){
            var idxToMove = getMaxIdxOfDependencies(tmpSchedule, activityToMove)+1;
            if(idxToMove!==tmpSchedules.length-2){
                borrame = moveActivity(tmpSchedule, idxToMove, activityToMove);
                newSchedules.push(borrame);
            }
        }               
    });
        return newSchedules;
    };

    //given an activity returns the allowed index to move depending of the dependencies idx
    function getMaxIdxOfDependencies(schedule, activity) {
        var maxIdx = 0;
        activity.getDependencies().forEach(function(dependencyAct){
            dependencyIdx = _.indexOf(schedule, dependencyAct);
            if (maxIdx < dependencyIdx){
                maxIdx = dependencyIdx;
            }
        });
        return maxIdx;
    };

    function moveActivity(schedule, idxToMove, activityToMove) {
        var tmpSchedule = schedule.slice(0, schedule.length-1);
        tmpSchedule.splice(idxToMove, 0, activityToMove);
        return tmpSchedule;
    };

    function addSchedule(schedule) {
      this.schedules.push(schedule);
    };

    function getSchedules() {
    	return this.schedules;
    };

    function concatTailSchedules(tailSchedules){
      var tmpSchedules = [];
      var tmpMovedSchedules = [];
      if(this.schedules.length === 0){
          this.schedules = tailSchedules;
      }else {
          this.schedules.forEach(function(schedule){
            tailSchedules.forEach(function(tailSchedule){
                tmpSchedules.push(schedule.concat(tailSchedule));                
            });
          });
          //mueve elementos
          tmpMovedSchedules = getScheduleByMovingActivities(tmpSchedules);
          this.schedules = tmpSchedules.concat(tmpMovedSchedules);
        }
    };

    return {concatTailSchedules: concatTailSchedules,
            getSchedules: getSchedules,
            addSchedule: addSchedule
            }; 
}();

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