ChatApp.View.Esperando = Backbone.View.extend({
     // var self = this;

    initialize: function () {
        ChatApp.vent.on('dejarEsperar', this.dejarEsperar);
        ChatApp.vent.on('mostrarEsperando', this.mostrarEsperando);
        this.el = $('section.esperando');
     },

    dejarEsperar: function () {

        window.console && console.log("Deixem d'esperar");
        evalSound();
        // ChatApp.View.Esperando.evalSound();
        // window.console && console.log("Amaguem esperando a través de self.$el = " + JSON.stringify(self.$el.selector, null, 4));
        // self.$el.hide();
        $('section.esperando').hide();

        // Showing the user list and the text area
        $('section.userList').removeClass('template');
        $('section.messages').removeClass('template');
        $('section.inputArea').removeClass('template');

        function evalSound () {
           window.console && console.log('Entrant a evalSound');
           // window.console && console.log('evalSound: element agafat ' + thisSound.id);
           // window.console && console.log('evalSound: cridem a play()');

            // if('webkitAudioContext' in window) {
            //     var myAudioContext = new webkitAudioContext();
            // } else {
            //     window.console && console.log('no webkitAudioContext')
            // }

            // var source = myAudioContext.createOscillator();
            // source.type = 0; // sine wave
            // source.frequency.value = 200;

            // var compressor = myAudioContext.createDynamicsCompressor();
            // var reverb = myAudioContext.createConvolver();
            // var volume = myAudioContext.createGainNode();
            // volume.gain.value = 30;

            // // connect source through a series of filters
            // source.connect(compressor);
            // compressor.connect(reverb);
            // reverb.connect(volume);
            // volume.connect(myAudioContext.destination);

            // window.console && console.log('evalSound: cridem a source.noteOn(0)');
            // source.noteOn(0);
            // window.console && console.log('evalSound: cridem a source.noteOn(0)');
        }

    },

    mostrarEsperando: function () {

        window.console && console.log("Comencem a esperar");

        // amaguem el que toca
        $('section.userList').addClass('template');
        $('section.messages').addClass('template');
        $('section.inputArea').addClass('template');
        $('section.welcome').addClass('template');

        // mostrem el que s'ha de veure
        $('section.esperando').removeClass('template');
        $('section.esperando').show();

        // Eliminem tots els missatges vells
        $('section.messages ul.no-padding li:not(:first)').remove();

    }

});	
