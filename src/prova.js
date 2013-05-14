var p = 0;
if (p == 0) print('zero');

myapp = {};

myapp.Greeter = function () {
};

myapp.Greeter.prototype.greet = function (name) {
    return "Hello " + name + "!";
};
