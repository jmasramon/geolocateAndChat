var BrowserStack = require( "browserstack" );
var client = BrowserStack.createClient({
    username: "jordi.masramon@gmail.com",
    password: "holalola"
});

client.getWorkers(function( error, workers ) {
    console.log( "The following workers are there" );
    console.log( workers );
    console.log( "Error:" );
    console.log( error );
});

