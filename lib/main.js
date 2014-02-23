var _ = require("underscore");



var API = function( options ){

}

API.prototype = {

	// Item methods
	data: {},

	get: function( key ){
		return this.data[key] || null;
	},

	set: function( data ){
		_.extend( this.data, data );
		// allow chainability
		return this;
	},

	// CRUD

	create: function( params ){
		// query
	},

	read: function( params ){
		// query
		var request = {};
		// save in memory
		this.set( request );
	},

	update: function( params ){
		// query
	},

	destroy: function( params ){
		// query
	},

	// alias for destroy (delete)...
	del: function( params ){
		return this.destroy( params );
	}

}

return function( options ){
	new API( options );
}