
var Activity = function(id){
  this.id = id;
  var  dependencies = [];
  
  function Activity() {    
    this.addDependency = function addDependency(activity) {
       dependencies.push(activity) 
    };

    this.getDependencies = function getDependencies() {
      return dependencies;
    };
  }
  return Activity;  
}();

module.exports.Activity = Activity;
