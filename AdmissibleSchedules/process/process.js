var ActivitySimple = function(id){ 
    this.id = id;
    this. dependencies = [];
}

ActivitySimple.prototype = { 
    addDependency: function(activity){
       this. dependencies.push(activity) 
    }
}

var Activity = function(){
  var dependencies = [];  
  
  function Activity(id) {    
  	this.id = id;
    this.addDependency = function addDependency(activity) {
      dependencies.push(activity);
    };

    this.getDependencies = function getDependencies() {
      return dependencies;
    };
  }
  return Activity;  
}();

module.exports.Activity = Activity;
module.exports.ActivitySimple = ActivitySimple;
