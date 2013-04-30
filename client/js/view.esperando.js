ChatApp.View.Esperando = Backbone.View.extend({

	initialize : function() {
		self = this;
		ChatApp.vent.on('dejarEsperar',this.dejarEsperar);
		ChatApp.vent.on('mostrarEsperando',this.mostrarEsperando);
		// this.el=$('section.esperando');
	},
	
	dejarEsperar: function() {
	
		console.log("Deixem d'esperar");
		self.$el.hide();
	
	},

	mostrarEsperando: function() {
	
		console.log("Comencem a esperar");
		self.$el.removeClass('template');
	
	}
});	
