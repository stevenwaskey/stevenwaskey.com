/**
 * @ngdoc overview
 * @name Atlas Core Modules
 * @description
 * Loads all angular third party
 * & external module dependencies.
 * @author Steven Waskey
 * @since 2016-06-16
 * @module core
 * @version 0.0.1
 */
(function(){


	"use strict";

	var modules = [
		"ui.bootstrap", 
		"ui.router",
		"satellizer", 
		"ngSanitize", 
		"ngAnimate", 
		"angulartics", 
		"angulartics.google.analytics", 
		"LocalStorageModule",
		"angular-velocity",
		"fullPage.js",
		"angular-parallax",
		"vAccordion"
	];

	angular
		.module( "core", modules )
		.constant( "MODULE_VERSION", "0.0.1" );

})();