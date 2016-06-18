/**
 * @ngdoc overview
 * @name Atlas System Notifications Module
 * @description
 * Manages user notification throughout
 * application.
 * @author Steven Waskey
 * @since 2016-05-23
 * @module notification
 * @version 0.0.1
 */
(function(){

	'use strict';

	function notificationService()
	{

		var _ = {};

		var history = [];

		var register = function( elem_name,callbacks )
		{

			callbacks = typeof callbacks === 'object' ? callbacks : {} ;

			_[ elem_name ] = { 
				on: ( callbacks.hasOwnProperty( 'on' ) ? callbacks.on : function(){} ),
				off: ( callbacks.hasOwnProperty( 'off' ) ? callbacks.off : function(){} ),
				set: ( callbacks.hasOwnProperty( 'set' ) ? callbacks.set : function(){} ),
				flash: ( callbacks.hasOwnProperty( 'flash' ) ? callbacks.flash : function(){} )
			};

		};

		var unregister = function( name )
		{};

		var alert = function()
		{

			var args,s,m,e;

			args = arguments[0] || {};
			m = args.hasOwnProperty( "message" ) ? args.message : false ;
			s = args.hasOwnProperty( "status" ) ? args.status : null ;
			e = args.hasOwnProperty( "element" ) ? args.element : null ;

			e = e ? e : "*" ;

			var r = {
				status: s,
				msg: m,
				elem: e
			}

			history.push( r );

			if( !_.hasOwnProperty( e ) ){ return; }

			_[ e ].flash( m, s, 3000 );

		}


		return {
			register: register,
			unregister: unregister,
			alert: alert
		}

	}

	/**
	* @ngdoc directive
	* @name Atlas/utilities/notification/notificationElement
	* @methodOf Atlas/utilities/notification
	* @description
	* Template directive to attach user notification communications.
	* @param {Object} notificationService Inject the notificationService provider.
	* @param {Object} $timeout Inject the `$timeout` service provider.
	*/
	function notificationElement( notificationService, $timeout )
	{

		/**
		* @ngdoc function
		* @name Atlas/utilities/notification/notificationElement:link
		* @methodOf Atlas/utilities/notification/notificationElement
		* @description
		* Notification element link method.
		* @param {Object} $scope Inject the `$scope` provider.
		* @param {Object} $element Inject the `$element` service provider.
		* @param {Object} $attrs Inject the `$attrs` service provider.
		*/
		function link( $scope, $element, $attrs )
		{		

			/**
			* @ngdoc property
			* @name Atlas/utilities/notification/notificationElement/link:status
			* @propertyOf Atlas/utilities/notification/notificationElement/link
			* @description Stores boolean value correlating to success or error message.
			*/
			$scope.status = null;

			/**
			* @ngdoc property
			* @name Atlas/utilities/notification/notificationElement/link:msg
			* @propertyOf Atlas/utilities/notification/notificationElement/link
			* @description Stores message to be communicated to user.
			*/
			$scope.msg = null;

			/**
			* @ngdoc property
			* @name Atlas/utilities/notification/notificationElement/link:collapse
			* @propertyOf Atlas/utilities/notification/notificationElement/link
			* @description Stores boolean value correlating to the collapsed state of the message container.
			*/
			$scope.collapse = true;

			/**
			* @ngdoc method
			* @name Atlas/utilities/notification/notificationElement/link:on
			* @propertyOf Atlas/utilities/notification/notificationElement/link
			* @description 
			* Sets boolean value of `collapse` variable to 'true'. 
			* Turning response message display on, or opening collapsed element.
			*/
			var on = function()
			{
				$scope.collapse = false;
			};

			/**
			* @ngdoc method
			* @name Atlas/utilities/notification/notificationElement/link:off
			* @propertyOf Atlas/utilities/notification/notificationElement/link
			* @description 
			* Sets boolean value of `collapse` variable to 'false'. 
			* Turning response message display off, or collpasing element.
			*/
			var off = function()
			{
				$scope.collapse = true;
			};
	
			/**
			* @ngdoc method
			* @name Atlas/utilities/notification/notificationElement/link:set
			* @propertyOf Atlas/utilities/notification/notificationElement/link
			* @description 
			* Sets message & status value of new user notification. 
			*/
			var set = function( m, status )
			{
				$scope.msg = m;
				$scope.status = status;

				$scope.classes = [ "alert" ];

				// Set the notification element classes based on status.
				if( $scope.status ){ $scope.classes.push( "alert-success" ); }
				else if( $scope.status === false ){ $scope.classes.push( "alert-danger" ); }
				$scope.classes = $scope.classes.join( " " );


			};
	
			/**
			* @ngdoc method
			* @name Atlas/utilities/notification/notificationElement/link:flash
			* @propertyOf Atlas/utilities/notification/notificationElement/link
			* @description 
			* Flashes the supplied notification message by calling local methods:
			* set, on, (delay) off
			*/
			var flash = function( msg,status,delay )
			{
				set( msg,status );
				on();
				delay = delay ? delay : 1000;
				$timeout(off,delay);
			};

			// create object with references to callback methods.
			var callbacks = { on: on, off: off, set: set, flash: flash };

			// register the element with the notificationService.
			notificationService.register( $attrs.name,callbacks );

		}

		/**
		* @ngdoc function
		* @name Atlas/utilities/notification/notificationElement:controller
		* @methodOf Atlas/utilities/notification/notificationElement
		* @description
		* Notification element controller method.
		* @param {Object} $scope Inject the `$scope` provider.
		* @param {Object} $element Inject the `$element` service provider.
		* @param {Object} $attrs Inject the `$attrs` service provider.
		*/
		function controller( $scope, $element, $attrs )
		{
			// unregister the notificationElement on element destruction.
			$scope.$on("$destroy",function(){ notificationService.unregister( $attrs.name ); });

		}

		return {
			restrict: "A",
			scope: { name: "@", class: "@" },
			template: "<div uib-collapse='collapse' class='collapse {{class}}' ng-class='classes'>"
					+		"<span class='msg-success' ng-if='status === true'><strong>Success:</strong>&nbsp;&nbsp;</span>"
					+		"<span class='msg-error' ng-if='status === false'><strong>Error:</strong>&nbsp;&nbsp;</span>"
					+		"<span ng-bind='msg' ng-class='{ \"msg-success\": status === true, \"msg-error\": status === false }'></span>"
					+	"</div>",
			link: link,
			controller: [ "$scope", "$element", "$attrs", controller ]
		}

	}

	angular
		.module( "notification", [] )
		.constant( "MODULE_VERSION", "0.0.1" )
		.directive( "notificationElement", [ "notificationService", "$timeout", notificationElement ] )
		.service( "notificationService", [ notificationService ] );

})();