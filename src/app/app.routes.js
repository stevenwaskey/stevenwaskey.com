/**
 * @ngdoc overview
 * @name Configuration
 * @description
 * Main application configuration, 
 * routes & states.
 * @author Steven Waskey
 * @since 2016-06-16
 * @module Atlas
 */
(function(){

	"use strict";

	/**
	* @ngdoc object
	* @name Atlas.config
	* @description
	* Stores application routes & configuration.
	* @param {Object} $stateProvider Injects the `$stateProvider` which stores & tracks all the application routes.
	* @param {Object} $urlRouterProvider Injects the `urlRouterProvider` which facilitates route management.
	* @param {Object} $authProvider Injects the `$authProvider` which stores & tracks the current authentication state & respective tokens.
	* @param {Object} $locationProvider Injects the `$locationProvider` which sets the HTML5 mode.
	* @param {Object} $animateProvider Injects the `$animateProvider` which allows application-wide animation configuration.
	* @param {Object} localStorageServiceProvider Injects the localStorageServiceProvider which provides access to local browser & session storage.
	*/
	function config( $stateProvider, $urlRouterProvider, $authProvider, $locationProvider, $animateProvider, localStorageServiceProvider )
	{

		// Set the local storage variable prefix to ensure
		// there are no naming collisions.
		localStorageServiceProvider.setPrefix( "Atlas_" )

			// Set the default path & expiration of storage cookies.
			.setStorageCookie( 30,"/" )

			// Set the cookie domain
			.setStorageCookieDomain( "stevenwaskey.com" );

		// Satellizer configuration that specific which API
		// endpoint to use for JWT Auth.
		$authProvider.loginUrl = "/api/authenticate";

		// If an invalid route is provided, redirect to home page.
		$urlRouterProvider.otherwise("/");

		// Define states.
		$stateProvider
			.state( "home", {
				url: "/",
				templateUrl: "/partials/components/single/single.html",
				controller: "PageController",
				controllerAs: "vm"
			});

		// Use the HTML5 History API
		$locationProvider.html5Mode(true);

	}

	angular
		.module( "Atlas" )
		.config( [ "$stateProvider", "$urlRouterProvider", "$authProvider", "$locationProvider", "$animateProvider", "localStorageServiceProvider", config ] );

})();