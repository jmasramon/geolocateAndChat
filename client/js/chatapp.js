/**
 * This is our top-level namespace. We will be placing all our objects under
 * this namespace.
 */
window.ChatApp = { // window es el topmost objecte per defecte quan el js corre en un navegador. it contains other objects like 'document', 'history' etc. within it
    View : {},
    Model : {}
}


/**
 * This is the socket.io server we will be connecting to.
 */
ChatApp.serverUrl = 'http://localhost:8080/';
// ChatApp.serverUrl = 'http://hidden-savannah-7936.herokuapp.com:8080/'; // pel heroku

ChatApp.vent = {}; // Simplement per passar events entre la connection i la view.esperando
_.extend(ChatApp.vent, Backbone.Events);

/**
 * We only actually start executing the javascript, once the dom is fully
 * loaded. All the initialization for the application logic is done here.
 */
$(document).ready(function() {

    var app = new ChatApp.Application();

});
