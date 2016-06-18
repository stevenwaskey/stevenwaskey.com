/**
 * @ngdoc overview
 * @name components
 * @description
 * This module contains all the sub-module
 * dependencies for each of the 
 * `$stateProvider` states.  
 * Each sub-module should map to a 
 * specific view state.
 * @author Steven Waskey
 * @since 2016-06-16
 * @module components
 * @version 0.0.1
 */
(function(){

	'use strict';

	var modules = [
		"global",
		"single"
	];

	angular
		.module( "components", modules )
		.constant( "MODULE_VERSION", "0.0.1" );

})();
