/**
 * @ngdoc overview
 * @name Atlas Utilities Module
 * @description
 * Atlas Utility Modules.
 * @author Steven Waskey
 * @since 2016-05-23
 * @module utilities
 * @version 0.0.1
 */
(function(){

	'use strict';

	var modules = [
		"PreLoader",
		"validation",
		"logging",
		"notification"
	];

	angular
		.module( "utilities", modules )
		.constant( "MODULE_VERSION", "0.0.1" );

})();