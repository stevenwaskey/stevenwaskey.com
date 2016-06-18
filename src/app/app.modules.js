/**
 * @ngdoc overview
 * @name Atlas
 * @description
 * Main application module.
 * Declares module dependencies.
 * @author Steven Waskey
 * @since 2016-06-16
 * @module Atlas
 * @version 0.0.1
 */
(function() {

    "use strict";

	/**
	 * @ngdoc overview
	 * @name Atlas
	 * @description
	 * Defines primary application module.
	 * Declares module dependencies.
	 * @module Atlas
	 */
    angular.module("Atlas", [

		/*
		 * We include all the angular
		 * required core modules.
		 */
		 "core",

        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */ 
		"utilities", 
		"shared", 

        /*
         * Application States / Pages
         */
		"components"

    ])

	// Application Module Version
	.constant( "MODULE_VERSION", "0.0.1" );

})();