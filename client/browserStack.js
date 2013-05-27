var BrowserStack = require( "browserstack" );
var client = BrowserStack.createClient({
    username: "jordi.masramon@gmail.com",
    password: "holalola"
});

client.getBrowsers(function( error, browsers ) {
    console.log( "The following browsers are available for testing" );
    console.log( browsers );
});

client.createWorker(function( error, workers ) {
    console.log( "The following workers are there" );
    console.log( workers );
});

client.getWorkers(function( error, workers ) {
    console.log( "The following workers are there" );
    console.log( workers );
});

client.terminateWorker( 1115457, function( error, data ) {
    console.log( "The following worker has been terminated" );
    console.log( data );
});