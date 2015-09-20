var outputBuilder = function(){    
    /**
     * Public frunction that print at the console the activities id order for each schedule found
     * @param [schedules] All schedules found.
     */
    function printSchedules(schedules) {  
        var line;
        schedules.forEach(function(schedule){
            line = "";
            schedule.forEach(function(activity){
               line = line + "," +activity.id;
            });
            //NOTE: I  know this is not the best way leave the comma out, but I want to show you that 
            //I wee understud the regex expresion.
            console.log(line.replace(/(^,)|(,$)/g, "")); 
        });
    };
  return {printSchedules: printSchedules};  
}();

module.exports = outputBuilder;