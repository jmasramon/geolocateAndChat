var that = this;

describe("The environtment of the app", function() {
  beforeEach(function() {
    spyOn(console, 'error').andCallThrough();
  });

  afterEach(function() {
  });

  it("should be the window", function(){
    expect(that).toBe(window);
  });

  it("should view the ChatApp", function() {
    window.ChatApp.constructor.name && expect(window.ChatApp.constructor.name).toBe('Object');
  });
  
  it("should view the app", function() {
    expect(window.app).toBeDefined();
  });
  
  it("should view the view", function() {
    expect(window.app.welcomeView).toBeDefined();
  });

  it("should not have triggered any error", function  () {
      expect(console.error).not.toHaveBeenCalled();
  });

});

