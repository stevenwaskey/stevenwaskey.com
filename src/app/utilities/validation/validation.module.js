/**
 * @ngdoc overview
 * @name Atlas Validation Module
 * @description
 * Stores all global application 
 * validation services, directives
 * & functions.
 * @author Steven Waskey
 * @since 2016-05-23
 * @module validation
 * @version 0.0.1
 */
(function(){

	'use strict';

	var modules = [
		"formFieldValidation",
		"formValidation"
	]

	angular
		.module( "validation", modules )
		.constant( "MODULE_VERSION", "0.0.1" );

})();