/**
 *
 * Welcome to the chat server :)
 *
 * The ChatServer uses socket.io to handle communication, which is pretty
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
var io = require('socket.io').listen(1337);
// Canvi per a AWS
var crypto = require('crypto');
// Canvio el codi per utilitzar el connect que és més senzill que el express
// express = require('express'),
// http = require('http'),
// path = require('path'),
// fs = require('fs'),
var users = [];

// // Servidor http per la plana inicial (i única)
// var util = require('util');
// var connect = require('connect');
// var port = 8080; // Tenim el web server escoltant al 1337

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
//    console.log('Express server listening on port ' + app.get('port'));
// });

function User () {
    this.id = ++User.lastId;
}

User.prototype.id = 0;
User.prototype.email = null;
User.prototype.nickName = null;
User.prototype.lat = null;
User.prototype.lng = null;
User.prototype.serialize = function () {
    return {
        id:       this.id,
        nickName: this.nickName,
        gravatar: "http://www.gravatar.com/avatar/" + crypto.createHash('md5').update(this.email).digest('hex')

    };
};

User.lastId = 0;
var R = 6371; // Km
// Formula correcta però no molt precisa

function distancia (user1, user2) {
    return Math.acos(Math.sin(user1.lat) * Math.sin(user2.lat) + Math.cos(user1.lat) * Math.cos(user2.lat) * Math.cos(user2.lng - user1.lng)) * R;
}
///////////////////////////////

function dosCerca () {
    //  console.log("comprobando cercania");
    if (users && users[0] && users[1]) {
        for (var i = 0; i <= users.length - 1; i++) {
            for (var j = i + 1; j <= users.length - 1; j++) {
                 console.log("i=" + i + " i j=" + j);
                var dist = distancia(users[i], users[j]);
                 console.log("Usuarios: " + users[i].nickName + " con coords (" + users[i].lat + " , " + users[i].lng + ") " + " y " + users[j].nickName + " con coords (" + users[j].lat + " , " + users[j].lng + ") estan a dist=" + dist);
                if (dist < 10) return true;
            }
        }
        return false;
    }
    return false;
}
//////////////////////////////
var interval;

function vigilar (chatRoom, socket) {
     console.log("Setting interval. For socket = " + socket.id);
    interval = setInterval(function () {
         console.log("checking proximity. For socket = " + socket.id);
        if (dosCerca()) {
             console.log("dos cerca. For socket = " + socket.id);
            // socket.broadcast.emit('usuarioCerca');
            chatRoom.emit('usuarioCerca');
            clearInterval(interval);
            interval = undefined;
        }
    }, 1000);
}

function grep (elems, callback, inv) {
    var retVal, ret = [],
        i = 0,
        length = elems.length;
    inv = !!inv;

    // Go through the array, only saving the items
    // that pass the validator function
    for (; i < length; i++) {
        retVal = !!callback(elems[i], i);
        if (inv !== retVal) {
            ret.push(elems[i]);
        }
    }

    return ret;
}

// io.sockets.on('connection', function(socket) {
var chatRoom;
chatRoom = io.of('/chat').on('connection', function (socket) {
     console.log("Connection stablished. For socket = " + socket.id);

    // TODO: acabar-ho bé. Ara se'n crea un per cada login i per tant envia
    // dos missatges pel socket. Però sinó, un dels dos no reb el missatge
    if (!interval) {
        vigilar(chatRoom, socket);
    }

    var user = new User();
    socket.set('user', user);

    socket.on('nick', function (info) {

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
         console.log('New array of users: ' + JSON.stringify(users, null, 4));

        chatRoom.emit('join', user.serialize()); // envia als usuaris connectats les dades del nou connectat
        socket.emit('userList', users.map(

            function (user) {
                return user.serialize();
            }));

    });

    socket.on('disconnect', function () {

         console.log("Initial users: " + JSON.stringify(users, null, 4) + " For socket = " + socket.id);
         console.log("User num " + users.indexOf(user) + " disconnecting." + " For socket = " + socket.id);
        users.splice(
            users.indexOf(user), 1); // Elimina l'usu de la llista d'usus connectats
         console.log("Final users: " + JSON.stringify(users, null, 4) + " For socket = " + socket.id);
        chatRoom.emit('part', user.serialize()); // envia als usus que queden connectats les dades del que se'n va
    });

    socket.on('sendMessage', function (message) {

        var payload = user.serialize();
        payload.message = message;
        payload.time = new Date();
        payload.userId = payload.id;
        delete payload.id; // ????
        // Sending the message back to the user
        // socket.emit('message', payload);
        // Sending the message to everyone else
        chatRoom.emit('message', payload);

    });

    socket.on('positionChange', function (info) {
         console.log('Datos recividos: ' + info.nickName + ', ' + info.lat + ', ' + info.lng);
         console.log("Initial users: " + JSON.stringify(users, null, 4));

        if (!info.lat || !info.lng || !info.nickName) {
            socket.emit('error', {
                message: "Both a nickName and a position must be supplied"
            });
            return;
        }

         console.log("Initial info: " + JSON.stringify(info, null, 4));
         console.log("Initial nickName: " + info.nickName);
        var movingUser = grep(users, function (e) {
            return e.nickName == info.nickName;
        }, false);

         console.log('moving user = ' + JSON.stringify(movingUser[0], null, 4));
         console.log('Array of users: ' + JSON.stringify(users, null, 4));
         console.log('Index of movingUser: ' + users.indexOf(movingUser[0]));

        users.splice(users.indexOf(movingUser[0]), 1); // Elimina l'usu de la llista d'usus connectats
         console.log('Array of users after splice: ' + JSON.stringify(users, null, 4));

        movingUser[0].lat = info.lat;
        movingUser[0].lng = info.lng;
        users.push(movingUser[0]); // Guarda el nou usu a la llista d'usus connectats. No hi ha bd. Tot es fa en t real (en memo)
         console.log('User moved. New array of users: ' + JSON.stringify(users, null, 4));
    });

});