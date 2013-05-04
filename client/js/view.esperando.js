ChatApp.View.Esperando = Backbone.View.extend({

	initialize : function() {
		self = this;
		ChatApp.vent.on('dejarEsperar',this.dejarEsperar);
		ChatApp.vent.on('mostrarEsperando',this.mostrarEsperando);
		this.el=$('section.esperando');
	},
	
	dejarEsperar: function() {
	
		console.log("Deixem d'esperar");
		self.$el.hide();
	    // Showing the user list and the text area
        $('section.userList').removeClass('template');
        $('section.messages').removeClass('template');
        $('section.inputArea').removeClass('template');

	},

	mostrarEsperando: function() {
	
		console.log("Comencem a esperar");
		self.$el.removeClass('template');
	
	}
});	
