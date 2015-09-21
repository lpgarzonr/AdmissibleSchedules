describe("inputBuider", function() {
  var inputBuilder = require('../../inputOutputBuilder/inputBuilder.js');

  it("should be able to create a process to schedule", function() {
    var result = inputBuilder.buildProcessToSchedule('InputString');
    expect(result).toBeTruthy();
  });

  it("call the buildProcessToSchedule function", function() {
    spyOn(inputBuilder, 'buildProcessToSchedule');
    inputBuilder.buildProcessToSchedule('InputString');
    expect(inputBuilder.buildProcessToSchedule).toHaveBeenCalledWith('InputString');
  });
});