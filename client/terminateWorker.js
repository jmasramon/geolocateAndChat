var BrowserStack = require( "browserstack" );
var client = BrowserStack.createClient({
    username: "jordi.masramon@gmail.com",
    password: "holalola"
});

var arguments = process.argv.splice(2);

arguments.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    client.terminateWorker( val, function( error, data ) {
        console.log( "The following worker has been terminated" );
        console.log( data );
    });
});
