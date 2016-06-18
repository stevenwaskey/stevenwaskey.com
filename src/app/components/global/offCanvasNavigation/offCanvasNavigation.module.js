/**
 * @ngdoc overview
 * @name offCanvasNavigation
 * @description
 * Logic controller for off-canvas / pocket
 * navigation styles.
 * @author 
 * @author Steven Waskey
 * @since 2016-06-16
 * @module offCanvasNavigation
 * @version 0.0.1
 */
(function(){

	"use strict";

	function cnOffCanvas($compile, $rootScope, $controller, $http, $templateCache, $q)
	{
		return function( config )
		{

			if((+!!config.template) + (+!!config.templateUrl) !== 1) {
				throw new Error();
			}

			var container = angular.element(config.container || document.body),
			containerClass = config.containerClass || 'is-off-canvas-opened',
			controller = config.controller || angular.noop,
			controllerAs = config.controllerAs,
			element = null,
			html;

			if(config.template) {
				var deferred = $q.defer();
				deferred.resolve(config.template);
				html = deferred.promise;
			}

			else{
				html = $http.get(config.templateUrl, {
					cache: $templateCache
				}).then(function(response) {
					return response.data;
				});
			}

			html.then(function(html) {
				var scope = $rootScope.$new();
				var ctrl = $controller(controller, {$scope: scope});
				if(controllerAs) {
					scope[controllerAs] = ctrl;
				}
				element = angular.element(html);
				container.prepend(element);
				$compile(element)(scope);
			})

			function toggle() {
				this.isOpened = !this.isOpened;
				container.toggleClass(containerClass);
			}

			return {
				toggle: toggle,
				isOpened: false
			}
		}
	}

	angular
		.module( "cn.offCanvas", [])
		.constant( "MODULE_VERSION", "0.0.1" )
		.factory( "cnOffCanvas", [ "$compile", "$rootScope", "$controller", "$http", "$templateCache", "$q", cnOffCanvas ] );


	function offCanvasToggle()
	{

		function controller( $scope, offCanvas )
		{
			$scope.toggle = function(){
				offCanvas.toggle();
			}
		}

		return {
			restrict: "A",
			controller: [ "$scope", "offCanvas", controller ]
		}

	}

	function offCanvasNavCtrl( offCanvas, $state, $location, $anchorScroll )
	{

		var vm = this;

		vm.toggle = offCanvas.toggle;

		vm.go = function( state )
		{
			offCanvas.toggle();
			$state.go( state );
		}

	}

	function offCanvas( cnOffCanvas )
	{
	    return cnOffCanvas({
	      controller: [ "offCanvas", "$state", "$location", "$anchorScroll", offCanvasNavCtrl ] ,
	      controllerAs: "nav",
	      templateUrl: "/partials/components/global/offCanvasNavigation/offCanvasNavigation.html"
	    });
	}
	angular
		.module( "offCanvasNavigation", [ "cn.offCanvas" ] )
		.constant( "MODULE_VERSION", "0.0.1" )
		.factory( "offCanvas", [ "cnOffCanvas", offCanvas ] )
		.directive( "offCanvasToggle", [ "cnOffCanvas", offCanvasToggle ] );

})();