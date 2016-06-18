/**
 * @ngdoc overview
 * @name Atlas Image Hover Roll-over Directive
 * @description
 * Atlas shared directives & components.
 * @author Steven Waskey
 * @since 2016-05-23
 * @module imgWithHover
 * @version 0.0.1
 */
(function(){

	"use strict";

	function imgWithHover( $timeout )
	{

		var imgs = {
			img_bg: {
				model: null,
				src: null
			},
			img_fg: {
				model: null,
				src: null
			}
		};
	
		var show = function( $scope, $element )
		{
			$scope.show_img = true;
			$element.find( ".img_fg" ).addClass("ng-show");
		};
	
		var hide = function( $scope, $element )
		{
			$scope.show_img = false;
		};

		function link( $scope, $element, $attrs )
		{

			$scope.img_bg = $attrs.src;
			$scope.img_fg = $attrs.src.replace( ".off.",".on." );
	
			$scope.show_img = false;
	
			$element.on("mouseover",function(){$timeout( show( $scope, $element ) ); });
	
			$element.on("mouseout",function(){$timeout( hide( $scope, $element ) ); });
	
		}
	
		return {
			restrict: "E",
			template: "<div class='img-with-hover' ><img src='{{img_bg}}' class='img-hover img-bg' /><img src='{{img_fg}}' ng-show='show_img' class='img-hover img-fg' /></div>",
			link: link
		};

	}

	angular
		.module( "imgWithHover", [] )
		.constant( "MODULE_VERSION", "0.0.1" )	
		.directive( "imgWithHover", [ "$timeout", imgWithHover ] );


})();