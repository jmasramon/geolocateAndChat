/**
 * The userList renders the list of users on the side of the screen.
 *
 * It ensures that new users are added and removed from the DOM when they log
 * on or off.
 */
ChatApp.View.UserList = Backbone.View.extend({

    /**
     * Initializer.
     *
     * This method binds a couple of events, and does some validation.
     */
    initialize: function () {

        if (!this.collection) {
            throw "To initialize the UserList view, you must pass the 'collection' option.";
        }

        var self = this;

        // Això és el que connecta els models a les vistes
        this.collection.bind('add', function (user) { // Quan s'afegeix al model
            self.addUser(user);
        });

        this.collection.bind('remove', function (user) { // Quan es treu del model
            self.removeUser(user);
        });

    },

    /**
     * This method is triggered whenever a new user was added to the collection.
     */
    addUser: function (user) {

        // Creating a new element for the user
        var newElem = this.$('li.template').clone();
        newElem.removeClass('template');

        // The label
        newElem.text(user.get('nickName'));

        // The gravatar
        newElem.css({
            backgroundImage: "url('" + user.get('gravatar') + "?s=25&d=retro')"
        });

        // Adding the user id, for easy identification
        newElem.data('userId', user.get('id'));
        newElem.show();
        this.$('ul.no-padding').append(newElem);

    },

    /**
     * This method is triggered whenever a user has left the room.
     */
    removeUser: function (user) {

        // We need to find the correct element, and remove it.
        this.$('li').each(function (key, elem) {
            elem = $(elem);
            if (elem.data('userId') == user.get('id')) {
                elem.remove();
            }
        });

    }

});