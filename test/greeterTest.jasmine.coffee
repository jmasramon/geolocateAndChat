describe "Greeter", ->
  it "says hello", ->
    expect(new myapp.Greeter().greet("World")).toEqual "Hello World!"

  it "does not says bye bye", ->
    expect(new myapp.Greeter().greet("World")).not.toEqual "Bye Bye!"

# GreeterTest = TestCase("GreeterTest");
# GreeterTest.prototype.testGreet = function() {
#     var greeter = new myapp.Greeter();
#     assertEquals("Hello World!", greeter.greet("World"));
# };
describe "Prova test", ->
  beforeEach ->
    @date = new Date(2009, 9, 2, 22, 14, 45)

  afterEach ->
    delete @date

  it " %Y should Return Full Year ", ->
    year = Date.formats.Y(@date)
    expect(year).toEqual jasmine.any(Number)
    expect(year).toEqual 2009

  it "test %m should return month", ->
    month = Date.formats.m(@date)
    expect(month).toEqual jasmine.any(String)
    expect(month).toEqual "10"

  it "test %d should return date", ->
    expect(Date.formats.d(@date)).toEqual "02"

  it "test %y should return year as two digits", ->
    expect(Date.formats.y(@date)).toEqual 9

# it("", function() {
#     expect( this.date.strftime("%F")).toEqual("2009-10-02");

# }); 