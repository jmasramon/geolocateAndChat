/**
 * The messageList view is responsible for showing all the messages that came
 * the users.
 */
ChatApp.View.MessageList = Backbone.View.extend({

    initialize: function () {

        if (!this.collection) {
            throw "To initialize the MessageList view, you must pass the 'collection' option.";
        }
        var self = this;

        this.collection.bind('add', function (message) {
            self.addMessage(message);
        });

    },

    /**
     * This method is called whenever a new message was received from the server.
     */
    addMessage: function (message) {

        // Creating a new message element
        var newElem = this.$('li.template').clone();
        newElem.removeClass('template');

        if (message.get('nickName') == $('input[name=nickName]').val()) {
            newElem.addClass('left');
        } else {
            newElem.addClass('right');
        }

        // Setting the nickname
        newElem.find('.nickName').text(message.get('nickName'));

        // Setting the time
        var ft = message.get('time');
        var hour = ft.getHours();
        var min = ft.getMinutes();
        if (min < 10) min = '0' + min;
        var sec = ft.getSeconds();
        if (sec < 10) sec = '0' + sec;

        formattedTime = hour + ':' + min + ':' + sec;

        newElem.find('time').text(formattedTime);

        // Set the actual message itself
        newElem.find('p').text(message.get('message'));

        // Setting the users' gravatar
        newElem.css({
            backgroundImage: "url('" + message.get('gravatar') + "?s=55&d=retro')"
        });

        newElem.show();

        this.$('ul.no-padding').append(newElem);

        // Scrolling all the way to the bottom
        this.$el.scrollTop(this.el.scrollHeight);

    }

});