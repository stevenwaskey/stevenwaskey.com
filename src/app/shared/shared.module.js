/**
 * @ngdoc overview
 * @name Atlas Shared Modules
 * @description
 * Loads all shared modules, components
 * & directives.  
 * @author Steven Waskey
 * @since 2016-05-23
 * @module shared
 * @version 0.0.1
 */
(function(){

	'use strict';

	var modules = [
		"imgFadeIn",
		"imgWithHover",
		"instafeed"
	];

	angular
		.module( "shared", modules )
		.constant( "MODULE_VERSION", "0.0.1" );


})();