/*
 * The InputArea view responds to messages submitted by the user.
 *
 * It makes sure that when the user hits enter, a 'message' event will be
 * emitted.
 */
ChatApp.View.InputArea = Backbone.View.extend({

    events : { // declarative callbacks for DOM events within a view (whitin the el of the view). Written in the format {"event selector": "callback"}
        'submit form' : 'submit'
    },

    /**
     * This method is called when the form is submitted.
     */
    submit : function(ev) {

        ev.preventDefault(); // jQuery: If this method is called, the default action of the event will not be triggered.

        // Grabbing the current message
        var message = this.$('input').val();

        // Not sending empty messages
        if (message.length < 1) {
            return;
        }

        this.trigger('message',message);

        // Clearing the input field
        this.$('input').val('');

    }

});
