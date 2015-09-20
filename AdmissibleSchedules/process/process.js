var _ = require("../node_modules/underscore/underscore.js");

var Activity = function(id){ 
    this.id = id;
    this. dependencies = [];
    this.level = 0;
    this.isMovable = false;
};

Activity.prototype = {
    //private 
   /* computeLevel :function computeLevel() {
      this.level = _.max(this.dependencies, function(activity){return activity.level;}).level + 1;
    },*/

    //public
    setMovable :function setMovable(isMovable) {
      this.isMovable = isMovable;
    },

    addDependency : function addDependency(activity) {
      this.computeLevel = function computeLevel() {
          this.level = _.max(this.dependencies, function(depActivity){return depActivity.level;}).level + 1;
      };
      this.dependencies.push(activity);
      this.computeLevel();
    },
    getDependencies : function getDependencies() {
      return _.flatten(this.dependencies);
    }

    
};

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
/*
var Activity = function(){
  this. dependencies = [];
  var pdependencies = {};
  
  function Activity() {    
    this.addDependency = function addDependency(activity) {
      this. dependencies.push(activity) 
    };

    this.getDependencies = function getDependencies() {
      return this. dependencies;
    };

    this.addPDependency = function addDependency(activity) {
      pdependencies.push(activity) 
    };

    this.getPDependencies = function getDependencies() {
      return pdependencies;
    };

  }
  return Activity;  
}();
*/
module.exports.Activity = Activity;
module.exports.Process = Process;