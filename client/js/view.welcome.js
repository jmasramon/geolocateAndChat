/**
 * The Welcome view is responsible for the login screen.
 *
 * The welcome view waits for the login form to be submitted, and after this is
 * done it should trigger a 'submit' event. 
 *
 * The submit event should get an object passed, containing two properties:
 *    nickName
 *    email
 */
 ChatApp.View.Welcome = Backbone.View.extend({

    events : {

        "submit form" : "submit"

    },

    submit : function(ev) {

        // Making sure the browser doesn't submit the form
        ev.preventDefault();

        // Gathering form values
        var nickName = this.$('input[name=nickName]').val();
        var email = this.$('input[name=email]').val();
        var lat = this.$('input[name=lat]').val();
        var lng = this.$('input[name=lng]').val();

        console.log('lat = ' + lat + ' lng = ' + lng);

        // Triggering the 'submit' event
        this.trigger('submit', {
            nickName : nickName,
            email    : email
            , lat      : lat
            , lng      : lng
        });

        // Hiding the welcome screen
        this.$el.hide();
        // Showing the user list and the text area
        $('section.userList').removeClass('template');
        $('section.inputArea').removeClass('template');

        ChatApp.vent.trigger('mostrarEsperando');
    }

});
