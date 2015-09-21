describe("outputBuider", function() {
  var outputBuilder = require('../../inputOutputBuilder/outputBuilder.js');

	it("should throw an error when no schedules have been provided", function() {
	  expect(function() {
	    outputBuilder.printSchedules();
	  }).toThrowError("No schedules to print");
	});

	it("should throw an error when the schedules list are empty", function() {
	  expect(function() {
	    outputBuilder.printSchedules([]);
	  }).toThrowError("No schedules to print");
	});
    //console.log(schedules);
});