/**
 * @ngdoc overview
 * @name global
 * @description
 * Stores required global components.
 * <br />
 * ie: site header, site navigation.
 * @author Steven Waskey
 * @since 2016-06-16
 * @module global
 * @version 0.0.1
 */
(function(){

	'use strict';

	var modules = [
		"offCanvasNavigation",
	];

	angular
		.module( "global", modules )
		.constant( "MODULE_VERSION", "0.0.1" );

})();