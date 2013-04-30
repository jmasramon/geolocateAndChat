/**
 * This is the main application class
 *
 * This class is responsible for doing all the initialization
 * of the application, as well as tying objects together.
 */
ChatApp.Application = function() {

    this.initModels();
    this.initConnection();
    this.initViews();

}

ChatApp.Application.prototype = {

    /**
     * Models
     */
    userList : null,
    messageList : null,

    /**
     * Connection
     */
    connection : null,

    /**
     * In this function models, or in this case specifically..
     * collections are being created.
     */
    initModels : function() {

        this.userList = new ChatApp.Model.UserList();
        this.messageList = new ChatApp.Model.MessageList();

    },

    /**
     * In this function all the views are created.
     */
    initViews : function() {
        // First we stablish the topmost dom element of every view (where the events will come from and where the manipulations will be done)
        var welcomeView = new ChatApp.View.Welcome({
            el : $('section.welcome')
        });
        var esperandoView = new ChatApp.View.Esperando({
            el : $('section.esperando')
        });
        var userListView = new ChatApp.View.UserList({
            el : $('section.userList'),
            collection : this.userList // Per tenir notificacions de canvis a qualsevol usuari
        });
        var inputAreaView = new ChatApp.View.InputArea({
            el : $('section.inputArea')
        });
        var messageListView = new ChatApp.View.MessageList({
            el : $('section.messages'),
            collection : this.messageList// Per tenir notificacions de canvis a qualsevol missatge
        });

        var self = this;

        // Definim els missatges que ens poden arribar de les vistes
        welcomeView.on('submit', function(userInfo) {
            self.connection.connect(userInfo.nickName, userInfo.email, userInfo.lat, userInfo.lng);
        });
        inputAreaView.on('message', function(message) { // triggered by the inputAreaView when a message is written
            self.connection.message(message);
        });
    },

    /**
     * In this function the server connection is created.
     */
    initConnection : function() {

        this.connection = new ChatApp.Connection(
            this.userList,
            this.messageList
        );

    }

}
