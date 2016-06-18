/**
 * @ngdoc overview
 * @name Atlas Image Fade-In Directive.
 * @description
 * Fades in the element on load.
 * Used as an element attribute.
 * Must be used with an element that can
 * trigger the 'load' event.
 * @author Steven Waskey
 * @since 2016-05-23
 * @module imgFadeIn
 * @version 0.0.1
 */
(function(){

	"use strict";

	function imgFadeIn( $timeout )
	{
	
		function link( $scope, $element, $attrs )
		{
	        $element.addClass( "img-fade ng-hide-remove" );
	        $timeout($element.on("load", function() {$element.addClass("ng-hide-add");}));
		}
	
		return {
		    restrict: "A",
		    link: link
		};
	
	}

	angular
		.module( "imgFadeIn", [] )
		.constant( "MODULE_VERSION", "0.0.1" )	
		.directive( "imgFadeIn", [ "$timeout", imgFadeIn ] );


})();