/**
 * @ngdoc overview
 * @name Angular Parallax Directive
 * @description
 * Attaches properties to imgs & 
 * other DOM elements to enable 
 * parallax style behavoirs.
 * @author Brett Donohoo
 * @since 2016-08-13
 * @module angular-parallax
 * @version 0.0.2

(function(){

	"use strict";

	function parallax( $window )
	{

		function link( $scope, $element, $attrs )
		{

			var setPosition = function () {

				if( !$scope.parallaxHorizontalOffset )
				{
					$scope.parallaxHorizontalOffset = "0";
				}

				var calcValY = $window.pageYOffset * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1 );

				if (calcValY <= $window.innerHeight)
				{

					var topVal = (calcValY < $scope.parallaxVerticalOffset ? $scope.parallaxVerticalOffset : calcValY);

					var hozVal = ($scope.parallaxHorizontalOffset.indexOf("%") === -1 ? $scope.parallaxHorizontalOffset + 'px' : $scope.parallaxHorizontalOffset);

					$element.css('transform', 'translate(' + hozVal + ', ' + topVal + 'px)');

				}
			};

			setPosition();

			angular.element( $window ).bind("scroll", setPosition );

			angular.element( $window ).bind("touchmove", setPosition );

		}

		return {
			restrict: 'A',
			scope: {
				parallaxRatio: '@',
				parallaxVerticalOffset: '@',
				parallaxHorizontalOffset: '@',
			},
			link: link
		};

	}

	function parallaxBackground( $window )
	{

		function link( $scope, $element, $attrs )
		{

			var setPosition = function () {

				var calcValY = ($element.prop('offsetTop') - $window.pageYOffset) * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1) - ($scope.parallaxVerticalOffset || 0);
			
				// horizontal positioning
				$element.css('background-position', "50% " + calcValY + "px");
			};
			
			// set our initial position - fixes webkit background render bug
			angular.element($window).bind('load', function(e) {
				setPosition();
				$scope.$apply();
			});
			
			angular.element( $window ).bind( "scroll", setPosition );

			angular.element( $window ).bind( "touchmove", setPosition );

		}

		return {
			restrict: 'A',
			transclude: true,
			template: '<div ng-transclude></div>',
			scope: {
				parallaxRatio: '@',
				parallaxVerticalOffset: '@',
			},
			link: link
		};

	}

	angular
		.module( "angular-parallax", [])
		.constant( "MODULE_VERSION", "0.0.2" )
		.directive( "parallax", [ "$window", parallax ] )
		.directive( "parallaxBackground", [ "$window", parallaxBackground ] );

})();
 */