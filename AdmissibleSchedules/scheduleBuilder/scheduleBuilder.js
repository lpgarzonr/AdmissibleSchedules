var _ = require("../node_modules/underscore/underscore.js");

var ScheduleTable = function(){ 
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
    },
    concatTailSchedules : function concatTailSchedules(tailSchedules){
      var temporalSchedule = [];
      if(this.schedules.length === 0){
          this.schedules = tailSchedules;
      }else {
          this.schedules.forEach(function(schedule){
            tailSchedules.forEach(function(tailSchedule){
                temporalSchedule.push(schedule.concat(tailSchedule));
            });
          });
          this.schedules = temporalSchedule;
        }
        console.log(temporalSchedule);
    }
};

var treeActivitiesBuilder = function(){
  var treeActivitiesByLevels = [];

    function buildTreeActivitiesByLevels(activities) {  
        //var array = $.map(myObj, function(value, index) { return [value];});
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