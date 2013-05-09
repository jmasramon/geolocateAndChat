ChatApp.View.Esperando = Backbone.View.extend({

	initialize : function() {
		self = this;
		ChatApp.vent.on('dejarEsperar',this.dejarEsperar);
		ChatApp.vent.on('mostrarEsperando',this.mostrarEsperando);
		this.el=$('section.esperando');
	},
	
	dejarEsperar: function() {
	
		console.log("Deixem d'esperar");
		// console.log("Amaguem esperando a través de self.$el = " + JSON.stringify(self.$el.selector, null, 4));
		// self.$el.hide();
		$('section.esperando').fadeOut();
    
    // Showing the user list and the text area
    $('section.userList').removeClass('template');
    $('section.messages').removeClass('template');
    $('section.inputArea').removeClass('template');

	},

	mostrarEsperando: function() {
	
		console.log("Comencem a esperar");
    $('section.userList').addClass('template');
    $('section.messages').addClass('template');
    $('section.inputArea').addClass('template');
    $('section.welcome').addClass('template');
		$('section.esperando').removeClass('template');
		$('section.esperando').show();

		// Eliminem missatges vells
		$('section.messages ul.no-padding li:not(:first)').remove();

	}

});	
