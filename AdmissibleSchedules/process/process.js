var _ = require("../node_modules/underscore/underscore.js");

/**
 * Constructor of a Activity
 */
var Activity = function(id){ 
    this.id = id;
    this. dependencies = [];
    this.level = 0;
    this.isMovable = false;
};

Activity.prototype = function(){
    /**
     * Private function to compute the level of the activitie in the process graph tree, based on the activities dependences levels
     * @param [{actDependencies}] Dependent activities
     * @return {number} Level of the activity in the procces graph tree
     */
    function computeLevel(actDependencies) {
        return _.max(actDependencies, function(depActivity){return depActivity.level;}).level + 1;
    };
    /**
     * Function to set if the activity can be moved in the schedule
     * @param {isMovable} Boolean which determine if the activity can be moved in the schedule
     */
    function setMovable(isMovable) {
        this.isMovable = isMovable;
    };
    function addDependency(activity) {
        this.dependencies.push(activity);
        this.level = computeLevel(this.dependencies);
    };
    function getDependencies() {
        return _.flatten(this.dependencies);
    };  
    return {setMovable: setMovable,
            addDependency: addDependency,
            getDependencies: getDependencies
            };  
}();

/**
 * Constructor of a Process
 */
var Process = function(){ 
    this.activities = [];
};
Process.prototype = function(){
    function addActivity(activity) {
      this.activities.push(activity);
    };

    /**
     * Provides the activities of the process
     * @return [{Activities}] List of actvities of the process, flatten is used to return all the activities inserted in a unique vector
     */
    function getActivities() {
      return _.flatten(this.activities);
    };
    return {getActivities: getActivities,
            addActivity: addActivity
            };     
}();

module.exports.Activity = Activity;
module.exports.Process = Process;