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
 */function User () {
    this.id = ++User.lastId
}
var io = require("socket.io").listen(8080), crypto = require("crypto"), users = [], util = require("util"), connect = require("connect"), port = 1337;
connect.createServer(connect.static(__dirname)).listen(port);
util.puts("Listening on " + port + "...");
util.puts("Press Ctrl + C to stop.");
User.prototype.id = 0;
User.prototype.email = null;
User.prototype.nickName = null;
User.prototype.serialize = function () {
    return{id: this.id, nickName: this.nickName, gravatar: "http://www.gravatar.com/avatar/" + crypto.createHash("md5").update(this.email).digest("hex")}
};
User.lastId = 0;
io.sockets.on("connection", function (e) {
    var t = new User;
    e.set("user", t);
    e.on("nick", function (n) {
        if (!n.email || !n.nickName) {
            e.emit("error", {message: "Both a nickName and an email property must be supplied"});
            return
        }
        t.email = n.email;
        t.nickName = n.nickName;
        users.push(t);
        e.broadcast.emit("join", t.serialize());
        e.emit("userList", users.map(function (e) {
            return e.serialize()
        }))
    });
    e.on("disconnect", function () {
        console.log(users);
        console.log(users.indexOf(t));
        users.splice(users.indexOf(t), 1);
        console.log(users);
        e.broadcast.emit("part", t.serialize())
    });
    e.on("sendMessage", function (n) {
        var r = t.serialize();
        r.message = n;
        r.time = new Date;
        r.userId = r.id;
        delete r.id;
        e.emit("message", r);
        e.broadcast.emit("message", r)
    })
});