var _ = require("../node_modules/underscore/underscore.js");

/**
 * Private function to compute the level of the activitie in the process graph tree, based on the activities dependences levels
 * @param [{actDependencies}] Dependent activities
 * @return {number} Level of the activity in the procces graph tree
 */
var ScheduleTable = function(){ 
    this.schedules = [];
};

ScheduleTable.prototype = function(){ 
    /**
     * Private function to provides the schedules generated by moving the activities into a given set of schedules
     * @param [{tmpSchedules}] List of temporal schedules
     * @return [{newSchedules}] List of the new generated schedules
     */
    function getScheduleByMovingActivities(tmpSchedules) {
        var newSchedules = [];
        tmpSchedules.forEach(function(tmpSchedule){
            var activityToMove = _.last(tmpSchedule);
            if(activityToMove.isMovable == true){
                var idxToMove = getMaxIdxOfDependencies(tmpSchedule, activityToMove)+1;
                if(idxToMove!==tmpSchedules.length-2){
                    newSchedules.push(moveActivity(tmpSchedule, idxToMove, activityToMove));
                }
            }               
        });

        /**
         * Private function to determine the index from which the activity can be inserted into a given schedule
         * @param {schedule} schedule
         * @param {activity} Activitie to evaluate where it could be inserted
         * @return {maxIdx} Index from which the activity can be inserted
         */
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
        
        /**
         * Private function to move the activity into a given schedule
         * @param {schedule} schedule
         * @param {idxToMove} Position to move the activity into the given schedule
         * @param {activityToMove} Activitie to be moved
         * @return {tmpSchedule} New schedule with the moved activity
         */
        function moveActivity(schedule, idxToMove, activityToMove) {
            var tmpSchedule = schedule.slice(0, schedule.length-1);
            tmpSchedule.splice(idxToMove, 0, activityToMove);
            return tmpSchedule;
        };

        return newSchedules;
    };

    function getSchedules() {
    	return this.schedules;
    };

    function concatSubSchedules(tailSchedules){
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
          tmpMovedSchedules = getScheduleByMovingActivities(tmpSchedules);
          this.schedules = tmpSchedules.concat(tmpMovedSchedules);
        }
    };

    return {concatSubSchedules: concatSubSchedules,
            getSchedules: getSchedules}; 
}();

/**
 * Module which allow to build all the schedules
 */
var shedulerBuilder = function(){
  var treeActivitiesByLevels = [];

   /**
   * Public function to build all the schedules
   * @param {processGraph} Process graph wich contains the activities with their respective dependency activities
   */
    function getSchedules(processGraph){
      var schedulesTable = new ScheduleTable();
      var activities = processGraph.getActivities();
      var treeActivitiesByLevel = buildTreeActivitiesByLevels(activities);
      var activitiesInPrevLevel = 0;
        treeActivitiesByLevel.forEach(function(activitiesInLevel){
          activitiesInLevel[0].forEach(function(activity){
            if (getActivitiesDependenciesInPreviousLevel(activity).length !== activitiesInPrevLevel)
            {
              activity.setMovable(true);
            }
          }); 
      var permutedActivities = getActivitiesPermutation(activitiesInLevel[0]);    
      schedulesTable.concatSubSchedules(permutedActivities);
      activitiesInPrevLevel = activitiesInLevel[0].length;
      }); 

        function getActivitiesDependenciesInPreviousLevel(activity){
          var dependencies = activity.getDependencies();
          var level = activity.level;
          return dependencies.filter(function (activityDep){
            return (activityDep.level === level-1);
          });
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
        return schedulesTable.schedules;
  };
   /**
   * Private function to build a tree of activities depending of the level of echa activity
   * @return [[{activity}] List of the activities group by level, each posicion of the treeActivitiesByLevels contains the list of activities whith the same level
   */
    function buildTreeActivitiesByLevels(activities) {  
        var treeActivitiesByLevelsObj = _(activities).groupBy(function(activity) {return activity.level;});
        treeActivitiesByLevels= _.map(treeActivitiesByLevelsObj,function(value, index) {
            return [value];
        });
        return treeActivitiesByLevels;
    };
  return {getSchedules: getSchedules};  
}();

module.exports.ScheduleTable = ScheduleTable;
module.exports.schedulerBuilder = shedulerBuilder;