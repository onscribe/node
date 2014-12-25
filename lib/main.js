var _ = require("underscore"),
	passport = require("passport"),
	defaults = require('../config/options'),
	OnscribeStrategy = require("passport-onscribe").Strategy;


var API = function( options ){
	// prerequisites
	options = options || {};
	options.callback = options.callback || function(accessToken, refreshToken, profile, done){ return done(null, profile, {}); };
	if( !options.key || !options.secret ) return;
	// extend default options
	this.options = _.extend({}, defaults, options);
	// setup passport to be ready for client-side auth
	passport.use(new OnscribeStrategy({
		clientID: options.key,
		clientSecret: options.secret,
		callbackURL: "/auth/onscribe/callback", // option?
		url: options.url || false // customize for a third-party server (no trailing slash)
	}, options.callback));
	// is this optional?
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});
	return this;
}

API.prototype = {

	// mirror of passport's authentication method
	auth: function(){
		if( arguments[1] ) {
			return passport.authenticate('onscribe', arguments[0], arguments[1]);
		} else {
			return passport.authenticate('onscribe', arguments[0]);
		}
	},

	// add as a middleware for every subsequent request...
	// initialize app middleware
	middleware: function( app ){
		app.use( passport.initialize() );
		app.use( passport.session() );
	},

	// expose passport
	passport: function(){
		return passport;
	},

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

module.exports = function( options ){
	return new API( options );
}