var BrowserStack = require( "browserstack" );
var client = BrowserStack.createClient({
    username: "JordiMasramonSol",
    password: "holalola"
});

client.createWorker({ device: 'Google Nexus 7', version: '4.1', os: 'android' }, function( error, workers ) {
    console.log( "The following workers are there" );
    console.log( workers );
    console.log( "Error:" );
    console.log( error );

});

client.getWorkers(function( error, workers ) {
    console.log( "The following workers are there" );
    console.log( workers );
    console.log( "Error:" );
    console.log( error );
});

