var testUtils = function(){
    function getSchedulesActivitiesIds(schedules){
    	var schedulesArray = [];
    	var scheduleString;
        schedules.forEach(function(schedule){
        	scheduleString = "";
            schedule.forEach(function(activity){
               scheduleString = scheduleString + activity.id;
            });
            schedulesArray.push(scheduleString);
        });  
        return schedulesArray;  	
  	}
  	return {getSchedulesActivitiesIds: getSchedulesActivitiesIds};  
}();

module.exports = testUtils;
