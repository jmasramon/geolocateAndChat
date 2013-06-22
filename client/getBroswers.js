var BrowserStack = require( "browserstack" );
var client = BrowserStack.createClient({
    username: "jordi.masramon@gmail.com",
    password: "holalola"
});

client.getBrowsers(function( error, browsers ) {
    console.log( "The following browsers are available for testing" );
    console.log( browsers );
});

