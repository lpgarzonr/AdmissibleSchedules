var Activity = function(id){ 
    this.id = id;
    this. dependencies = [];
};

Activity.prototype = { 
    addDependency : function addDependency(activity) {
      this.dependencies.push(activity);
    },
    getDependencies : function getDependencies() {
      return this.dependencies;
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
      return this.activities; //TODO: flaten para permitir q se metan listas o de a uno
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