/**
 *
 * Welcome to the chat server :)
 *
 * The chatserver uses socket.io to handle communication, which is pretty
 * awesome to start with.
 *
 * # The following events are supported:
 *
 * ## nick
 *
 * Requires an object like the following:
 * {
 *   name : 'Your name',
 *   email : 'Your email address'
 * }
 *
 * ## message
 *
 * Requires just a string.
 *
 * # The server broadcasts the following events:
 *
 * ## nick
 *
 * This event is emitted whenever a new user connects
 *
 * This event sends an object like:
 * {
 *   id : "A random, unique id",
 *   name : 'Their username',
 *   gravatar : 'A url to the users gravatar'
 * }
 *
 * ## message
 *
 * This event an object such as:
 * {
 *   userId : "The users id",
 *   message : "The actual message"
 * }
 *
 * ## part
 *
 *   userId : "The users id",
 *
 * ## userList
 *
 * This sends an array containing all the current users in the chat.
 * This array looks something like this:
 *
 * [
 *   {
 *     nickName : 'user1',
 *     id : 'some random id',
 *     gravatar : 'A url to the users gravatar'
 *   },
 *   {
 *     nickName : 'user2',
 *     id : 'some random id'
 *     gravatar : 'A url to the users gravatar'
 *   }
 * ]
 *
 *
 */

// var io = require('socket.io').listen(8080), //Tenim el app server escoltant al 8080
var io = require('socket.io').listen(1337), // Canvi per a AWS
    crypto = require('crypto'),
// Canvio el codi per utilitzar el connect que és més senzill que el express
    // express = require('express'),
    // http = require('http'),
    // path = require('path'),
    // fs = require('fs'),
    users = [];

// var util = require('util'),  // Eliminat per a AWS
//     connect = require('connect'),
//     port = 1337;                        // Tenim el web server escoltant al 1337

// connect.createServer(connect.static(__dirname)).listen(port);
// util.puts('Listening on ' + port + '...');
// util.puts('Press Ctrl + C to stop.');

// var app = express();
// // all environments
// app.set('port', process.env.PORT || 3000);
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);

// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

// app.get('/', function(req, res){ res.render('index', { title: 'Express' }); });

// app.get('/index', function(req, res) {
//     fs.readFile('../client/index.html', function(error, content) {
//         if (error) {
//             res.writeHead(500);
//             res.end();
//         }
//         else {
//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.end(content, 'utf-8');
//         }
//     });
// });

// app.get('/js/*', function(req, res) {
//     fs.readFile('../client/index.html', function(error, content) {
//         if (error) {
//             res.writeHead(500);
//             res.end();
//         }
//         else {
//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.end(content, 'utf-8');
//         }
//     });
// });


// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });


function User() {
    this.id = ++User.lastId;
}

User.prototype.id = 0;
User.prototype.email = null;
User.prototype.nickName = null;
User.prototype.lat = null;
User.prototype.lng = null;
User.prototype.serialize = function() {
    return {
        id : this.id,
        nickName : this.nickName,
        gravatar : "http://www.gravatar.com/avatar/" + crypto.createHash('md5').update(this.email).digest('hex')

    };
};

User.lastId = 0;

///////////////////////////////
function dosCerca(){
    // console.log("comprobando cercania");
    if (users && users[0] && users[1]){
       
        var dist = Math.sqrt(Math.pow((users[0].lat-users[1].lat),2)+Math.pow((users[0].lat-users[1].lat),2));
        console.log("Usuarios: " + users[0].nickName + " con coords (" + users[0].lat + " , " + users[0].lng  + ") "  + " y " + users[1].nickName+ " con coords (" + users[1].lat + " , " + users[1].lng  + ") estan a dist=" + dist);
        if ( dist < 10 ) return true;
        return false;
    }
}


//////////////////////////////

io.sockets.on('connection', function(socket) {

    // TODO: acabar-ho bé. Ara se'n crea un per cada login i per tant envia dos missatges pel socket
    if (!interval){
        var interval = setInterval(function(){ 
            if (dosCerca()) { 
                console.log("dos cerca"); 
                socket.broadcast.emit('usuarioCerca');
                clearInterval(interval); 
            }
        }, 1000);
    }

    var user = new User();
    socket.set('user', user);

    socket.on('nick', function(info) {

        if (!info.email || !info.nickName) {
            socket.emit('error', {
                message: "Both a nickName and an email property must be supplied"
            });
            return;
        }
        user.email = info.email;
        user.nickName = info.nickName;
        user.lat = info.lat;
        user.lng = info.lng;
        users.push(user); // Guarda el nou usu a la llista d'usus connectats. No hi ha bd. Tot es fa en t real (en memo)

        console.log(user);

        socket.broadcast.emit('join', user.serialize()); // envia als usuaris connectats les dades del nou connectat
        socket.emit('userList', users.map(
            function(user) {
                return user.serialize();
            }
        ));

    });

    socket.on('disconnect', function() {

        console.log(users);
        console.log(users.indexOf(user));
        users.splice(
            users.indexOf(user),
            1
        ); // Elimina l'usu de la llista d'usus connectats
        console.log(users);
        socket.broadcast.emit('part', user.serialize()); // envia als usus que queden connectats les dades del que se'n va

    });

    socket.on('sendMessage', function(message) {

        var payload = user.serialize();
        payload.message = message;
        payload.time = new Date();
        payload.userId = payload.id;
        delete payload.id; // ????

        // Sending the message back to the user
        socket.emit('message', payload);
        // Sending the message to everyone else
        socket.broadcast.emit('message',payload);

    });

});

