var _ = require("../node_modules/underscore/underscore.js");

var Activity = function(id){ 
    this.id = id;
    this. dependencies = [];
    this.level = 0;
    this.isMovable = false;
};

Activity.prototype = function(){

    function computeLevel(dependencies) {
        return _.max(dependencies, function(depActivity){return depActivity.level;}).level + 1;
    };
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


var Process = function(){ 
    this.activities = [];
};
Process.prototype = { 
    addActivity : function addActivity(activity) {
      this.activities.push(activity);
    },
    getActivities : function getActivities() {
      return _.flatten(this.activities);
    }
};

module.exports.Activity = Activity;
module.exports.Process = Process;