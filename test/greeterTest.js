GreeterTest = TestCase("GreeterTest");

GreeterTest.prototype.testGreet = function () {
    var greeter = new myapp.Greeter();
    assertEquals("Hello World!", greeter.greet("World"));
};

ProvaTest = TestCase("provaTest");

ProvaTest.prototype.setUp = function () {
    this.date = new Date(2009, 9, 2, 22, 14, 45);
};

ProvaTest.prototype.tearDown = function () {
    delete this.date;
};

ProvaTest.prototype.testYshouldReturnFullYear = function () {
    var year = Date.formats.Y(this.date);
    assertNumber(year);
    assertEquals(2009, year);
};

ProvaTest.prototype.testmshouldreturnmonth = function () {
    var month = Date.formats.m(this.date);
    assertString(month);
    assertEquals("10", month);
};

ProvaTest.prototype.testdshouldreturndate = function () {
    assertEquals("02", Date.formats.d(this.date));
};

ProvaTest.prototype.testyshouldreturnyearastwodigits = function () {
    assertEquals("09", Date.formats.y(this.date));
};

ProvaTest.prototype.testFshouldactasYmd = function () {
    assertEquals("2009-10-02", this.date.strftime("%F"));
};
