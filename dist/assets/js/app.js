/**
 * @ngdoc overview
 * @name Atlas
 * @description
 * Main application module.
 * Declares module dependencies.
 * @author Steven Waskey
 * @since 2016-06-16
 * @module Atlas
 * @version 0.0.1
 */
(function() {

    "use strict";

	/**
	 * @ngdoc overview
	 * @name Atlas
	 * @description
	 * Defines primary application module.
	 * Declares module dependencies.
	 * @module Atlas
	 */
    angular.module("Atlas", [

		/*
		 * We include all the angular
		 * required core modules.
		 */
		 "core",

        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */ 
		"utilities", 
		"shared", 

        /*
         * Application States / Pages
         */
		"components"

    ])

	// Application Module Version
	.constant( "MODULE_VERSION", "0.0.1" );

})();
/**
 * @ngdoc overview
 * @name Configuration
 * @description
 * Main application configuration, 
 * routes & states.
 * @author Steven Waskey
 * @since 2016-06-16
 * @module Atlas
 */
(function(){

	"use strict";

	/**
	* @ngdoc object
	* @name Atlas.config
	* @description
	* Stores application routes & configuration.
	* @param {Object} $stateProvider Injects the `$stateProvider` which stores & tracks all the application routes.
	* @param {Object} $urlRouterProvider Injects the `urlRouterProvider` which facilitates route management.
	* @param {Object} $authProvider Injects the `$authProvider` which stores & tracks the current authentication state & respective tokens.
	* @param {Object} $locationProvider Injects the `$locationProvider` which sets the HTML5 mode.
	* @param {Object} $animateProvider Injects the `$animateProvider` which allows application-wide animation configuration.
	* @param {Object} localStorageServiceProvider Injects the localStorageServiceProvider which provides access to local browser & session storage.
	*/
	function config( $stateProvider, $urlRouterProvider, $authProvider, $locationProvider, $animateProvider, localStorageServiceProvider )
	{

		// Set the local storage variable prefix to ensure
		// there are no naming collisions.
		localStorageServiceProvider.setPrefix( "Atlas_" )

			// Set the default path & expiration of storage cookies.
			.setStorageCookie( 30,"/" )

			// Set the cookie domain
			.setStorageCookieDomain( "stevenwaskey.com" );

		// Satellizer configuration that specific which API
		// endpoint to use for JWT Auth.
		$authProvider.loginUrl = "/api/authenticate";

		// If an invalid route is provided, redirect to home page.
		$urlRouterProvider.otherwise("/");

		// Define states.
		$stateProvider
			.state( "home", {
				url: "/",
				templateUrl: "/partials/components/single/single.html",
				controller: "PageController",
				controllerAs: "vm"
			});

		// Use the HTML5 History API
		$locationProvider.html5Mode(true);

	}

	angular
		.module( "Atlas" )
		.config( [ "$stateProvider", "$urlRouterProvider", "$authProvider", "$locationProvider", "$animateProvider", "localStorageServiceProvider", config ] );

})();
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
/**
 * @ngdoc overview
 * @name components
 * @description
 * This module contains all the sub-module
 * dependencies for each of the 
 * `$stateProvider` states.  
 * Each sub-module should map to a 
 * specific view state.
 * @author Steven Waskey
 * @since 2016-06-16
 * @module components
 * @version 0.0.1
 */
(function(){

	'use strict';

	var modules = [
		"global",
		"single"
	];

	angular
		.module( "components", modules )
		.constant( "MODULE_VERSION", "0.0.1" );

})();

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
/**
 * @ngdoc overview
 * @name Steven waskey single page.
 * @description
 * Single page template for stevenwaskey.com
 * @since 2016-06-16
 * @module work
 * @version 0.0.1
 * @state singlePage
 */
(function(){

	"use strict";

	/**
	 * @ngdoc function
	 * @name Atlas/components/services/Page Controller
	 * @description
	 * Main UI Controller for Work Page.
	 * @param {Object} $scope Inject the view 'scope' used for data-binding to the UI.
	 * @param {Object} $state Inject the `$state` service.
	 * @param {Object} $http Inject the `$http` service provider.
	 * @param {Object} $q Inject the `$q` service provider for promises.
	 * @param {Object} PreLoader Inject the image `PreLoader` service.
	 * @param {Object} notificationService Inject the `notificationService` provider, controls user notification elements.
	 */
	function PageController( $scope, $state, $http, $q, PreLoader, notificationService )
	{

		var vm = this;

		vm.fp_options = {
			anchors: ['home', 'about', 'work'],
			scrollingSpeed: 2000,
			scrollOverflow: true
		};

		vm.visit = function( url )
		{
			window.open( url );
		}

		vm.cards = [
			{
				title: "Maxed Out Marine",
				name: "maxed",
				img_src: "bg.work.maxed.primary.jpg",
				tech: "Angular JS, BS3, Laravel, MySQL",
				descrip: "Full Design, UI, UX | Custom back-end for vehicle lead tracking",
				url: "http://maxedoutmarine.com",
				notes: "Client brought us his vision & his goals.  We had creative freedom.",
				external: []
			},{
				title: "Tikiz Shaved Ice & Ice Cream Franchising",
				name: "tikiz",
				img_src: "bg.work.tikiz.primary.jpg",
				tech: "WordPress, PHP, MySQL",
				descrip: "Design elements | Hosting | Maintenance | Currently under redesign",
				url: "http://tikiz.com",
				notes: "Client had basic site built by internal staff.  We took over design & development tasks when their needs outgrew their skillset.",
				external: []
			},{
				title: "The Give N Go Project",
				name: "givengo",
				img_src: "bg.work.givengo.primary.jpg",
				tech: "jQuery, HTML",
				descrip: "Design elements | Site development",
				url: "http://thegivengoproject.org",
				notes: "Awesome organization. We worked with their designer to effectively & visually communicate their brand.",
				external: []
			},{
				title: "My Dental Fix RX",
				name: "mydfx",
				img_src: "bg.work.mydfx.primary.jpg",
				tech: "jQuery, BS3, PHP, MySQL",
				descrip: "Full Design, UI, UX | Custom back-end for franchisee resource management",
				url: "http://mydentalfixrx.com",
				notes: "Online resource for franchisees to access corporate docs, marketing resources, training materials & buy/sell/trade used equipment.",
				external: []
			},{
				title: "Atlas Outcomes Tracking",
				name: "atlascap",
				img_src: "bg.work.atlascap.primary.jpg",
				tech: "jQuery, BS3, NodeJS, Websockets, PHP, MySQL, New Relic, CDN",
				descrip: "Full Design, UI, UX | Custom CRM | Outcomes Tracking | Analytics & Compliance Reporting | Scheduleing & Appointments",
				url: "https://atlasresults.us",
				notes: "My largest project to date.  Designed to track service outcomes rendered to poverty-stricken families with a comprehensive suite of tools to facilitate the organization's service-delivery model.",
				external: []
			},{
				title: "Atlas Results",
				name: "atlas",
				img_src: "bg.work.atlas.primary.jpg",
				tech: "Angular JS, BS4, NodeJs, CDN",
				descrip: "Full Design, UI, UX | Site developent",
				url: "https://atlasresults.com",
				notes: "My company site.  This is my playground :)",
				external: []
			},{
				title: "Congressman Rich Nugent",
				name: "nugent",
				img_src: "bg.work.nugent.primary.jpg",
				tech: "HTML",
				descrip: "Full Design, UI, UX | Site development",
				url: "",
				notes: "Prior to being congressman, Rich Nugent was our local Sherriff for two terms.  We did the site design & development. Circa 1998 - takin it back to the old school.",
				external: []
			},{
				title: "Textrooms",
				name: "textrooms",
				img_src: "bg.work.textrooms.primary.jpg",
				tech: "jQuery, PHP, MySQL, Twilio",
				descrip: "Design elements | Site development | API design & development",
				url: "",
				notes: "A Gainsville based start-up that created a chat-room styled text-messaging service.  I did all the back-end architecture & development.",
				external: []
			},{
				title: "Hawk's Eye Home Inspections",
				name: "hawkseye",
				img_src: "bg.work.hawkseye.primary.jpg",
				tech: "Angular JS, BS3, Laravel, MySQL, New Relic, PECL Stats",
				descrip: "Full design, UI, UX | Custom backend for home inspection tracking | Quantitative analysis on home inspection data",
				url: "https://hawkseyellc.com",
				notes: "Client runs a large home inspection services agency.  We developed their site, and built a scoring model to quantitate the outcomes of inspections, providing significant additional detail for homeowners insurance underwriting.",
				external: []
			},{
				title: "Speedy Shot Timer",
				name: "speedy",
				img_src: "bg.work.speedy.primary.jpg",
				tech: "PhoneGap, NodeJS",
				descrip: "Full design, UI, UX | App development",
				url: "",
				notes: "This was a really fun project to [practice] build an app that timed the delay between shots when in competitive speed shooting matches.  Uses the devices microphone to detect the sound of gun shots.",
				external: []
			},{
				title: "Spestle",
				name: "spestle",
				img_src: "bg.work.spestle.primary.jpg",
				tech: "jQuery, PHP, MySQL",
				descrip: "Design elements | Site development | Webservice design & development",
				url: "https://techcrunch.com/2012/09/12/spestle-is-cafepress-for-seasoning-blends-seriously/",
				notes: "If you're a foodie, this is your utopia.  A slick drag & drop tool to empower chefs to create their own custom blends, package & brand them, then sell them.  Went to TechCrunch with this one.  What a blast.",
				external: [ { label: "TechCrunch", url: "https://techcrunch.com/2012/09/12/spestle-is-cafepress-for-seasoning-blends-seriously/" } ]
			},{
				title: "South Florida Bounce",
				name: "sfb",
				img_src: "bg.work.sfb.primary.jpg",
				tech: "WordPress, FreshDesk",
				descrip: "Design elements | Hosting | Performance enhancements | Leads tracking",
				url: "https://southfloridabounce.com",
				notes: "Took over design & development.  Client was in need of developer with greater bandwith to complete their frequent updates.",
				external: []
			},{
				title: "Go Combine Athletics",
				name: "combine",
				img_src: "bg.work.combine.primary.jpg",
				tech: "jQuery, PHP",
				descrip: "Site development",
				url: "http://go-combine.com/",
				notes: "Built a single page site for a collegue graphic designer.  Horizontal scrolling.  Integrates with their scheduling platform.",
				external: []
			},{
				title: "Dominion Surf",
				name: "dominion",
				img_src: "bg.work.dominion.primary.jpg",
				tech: "Flash MX, jQuery, PHP",
				descrip: "Full design, UI, UX | Site development",
				url: "",
				notes: "Pretty old project, but one of my favorites.  Clients were super cool.  All flash designed site for custom surfboard builders in New Smyrna Beach, FL.",
				external: []
			},{
				title: "GI-Tax",
				name: "gitax",
				img_src: "bg.work.gitax.primary.jpg",
				tech: "Photoshop, Illustrator",
				descrip: "Logo design | Site design planning",
				url: "http://gitax.com/",
				notes: "Worked with the client to visually achieve their brand's feeling & message.  DesignZillas in Orlando built site.  Great experience!",
				external: []
			},{
				title: "Old McMicky's Farm",
				name: "ommf",
				img_src: "bg.work.ommf.primary.jpg",
				tech: "WordPress, jQuery, BS3, Laravel, MySQL",
				descrip: "Site hardening | HA Hosting | Currently under redesign | Custom back-end for 'Mission I Do' Analytics",
				url: "https://oldmcmickys.com",
				notes: "Client was introduced to us to help analyze a voting result dataset from a $30,000 wedding giveaway.  We subsequently took over management of their site & are currently designing a new site.",
			}
		]
	}

	angular
		.module( "single", [] )
		.constant( "MODULE_VERSION", "0.0.1" )
		.controller( "PageController", [ "$scope", "$state", "$http", "$q", "PreLoader", "notificationService", PageController ] );

})();
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
/**
 * @ngdoc overview
 * @name Instagram Feed Wrapper
 * @description
 * Fetches images from Instagram API
 * using the Instafeed JS library.
 * @author Steven Waskey
 * @since 2016-06-16
 * @module instafeed
 * @version 0.0.1
 */
(function(){
	
	"use strict";

	/**
	 * @ngdoc service
	 * @name InstagramService
	 * @description
	 * Serves up the Instafeed API object.
	 * @param {Object} $q Inject the promise manager '$q'.
	 * @param {Object} $http Inject the HTTP service provider.
	 */
	function InstagramService( $q, $http )
	{


		var ig_feed;

		/**
		 * @ngdoc property
		 * @name data
		 * @propertyOf Atlas/shared/InstagramService
		 * @description
		 * Stores parsed data, returned from Instagram
		 * API
		 */
		var data = {};

		
		/**
		 * @ngdoc function
		 * @name get
		 * @propertyOf Atlas/shared/InstagramService
		 * @description
		 * Returns requested value from private 
		 * `data` object.
		 * @param {Object} param Attrib directing the method as to what type of data, or which piece of data, is being requested.
		 */
		this.get = function( param )
		{
			if( data === false ){ return false; }

			if( typeof data !== "object" ){ return false; }

			if( typeof param !== "string" ){ return data; }

			if( data.hasOwnProperty( param ) )
			{
				return data[ param ];
			}

			return "ERR";

		}


		/**
		 * @ngdoc function
		 * @name parse
		 * @propertyOf Atlas/shared/InstagramService
		 * @description
		 * Parses response from Instafeed data dump.
		 */
		var parse = function( response )
		{

			var d,r,f,passed;

			if( typeof response !== 'object' )
			{
				data = false;
				return false;
			}

			data = { images: [] };


			for( r in response )
			{

				if( typeof response[r] !== "object" ){ continue; }

				if( !response[r].hasOwnProperty( "data" ) ){ continue; }

				if( typeof response[r].data !== "object" ){ continue; }

				for( d in response[r].data )
				{
					if( response[r].data[d].hasOwnProperty( "images" ) )
					{
						data.images.push( response[r].data[d].images );
						passed = true;
					}
				}
			}

			return passed === true;
		}

		/**
		 * @ngdoc function
		 * @name fetch
		 * @propertyOf Atlas/shared/InstagramService
		 * @description
		 * Instantiates the Instafeed API object
		 * makes default request to Instagram API
		 * service.
		 */
		this.fetch = function()
		{
			var deferred = $q.defer();
			var t,r;
			var responses = [];

			ig_feed = new Instafeed({
				get: "user",
				userId: "3421829353",
				accessToken: "3421829353.1677ed0.d4c692d961ba4866aea147fcfa1fc02c",
				mock: true,
				sortBy: "random",
				success: function( response )
				{

					responses.push( response );

					t = 0;

					for( r in responses )
					{
						t += parseInt( responses[r].data.length );
					}

					// if( ig_feed.hasNext() )
					if( t > 40 )
					{
						if( parse( responses ) )
						{
							deferred.resolve();
						}
						
						else
						{
							deferred.reject();
						}


					}

					else
					{
						ig_feed.next();
						ig_feed.run();
					}
				}
			});
			ig_feed.run();

			return deferred.promise;
		}

	}

	function InstagramGrid( InstagramService )
	{

		function controller( $scope, $element, $attrs )
		{

			var vm = this;

			vm.imgs = null;

			vm.img_size = "low_resolution";

			vm.build = function()
			{
				vm.imgs = InstagramService.get( "images" );
			}

			InstagramService
				.fetch()
				.then(vm.build);

		}

		return {
			scope: {},
			restrict: "E",
			controller: [ "$scope","$element","$attrs",controller ],
			controllerAs: "grid",
			template: "<section class='instagram-grid row'><div class='grid-item' ng-repeat='img in grid.imgs'><img ng-src='{{img[grid.img_size].url}}' /></div></section>"
		}

	}

	angular.module( "instafeed",[] )
		.constant( "MODULE_VERSION", "0.0.1" )	
		.service( "InstagramService", [ "$q", "$http", InstagramService ] )
		.directive( "instagramGrid",[ "InstagramService", InstagramGrid ] );

})();
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
/**
 * @ngdoc overview
 * @name Atlas Formatter Module
 * @description
 * Formats variables, returning 
 * desired output by method
 * selected.
 * @author Steven Waskey
 * @since 2016-06-03
 * @module formatter
 * @version 0.0.1
 */
(function(){

	"use strict";

	/**
	* @ngdoc directive
	* @name Atlas/utilities/formatter/notificationElement
	* @methodOf Atlas/utilities/notification
	* @description
	* Template directive to attach user notification communications.
	*/
	function Formatter(){

		var currency = function( number, decimal, symbol )
		{
			decimal = !isNaN( decimal ) ? decimal : 0 ;
			symbol = typeof symbol !== 'undefined' && symbol !== null ? symbol : '' ;
			var formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: decimal,
			});
			return symbol + formatter.format(number);
		}

		var ucwords = function( str )
		{
			return (str + '').toLowerCase()
						.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
							return $1.toUpperCase();
						});
		}

		var ucfirst = function( str )
		{
			str += "";
			var f = str.charAt(0).toUpperCase();
  			return f + str.substr(1);
		}

		var wordwrap = function( str, length )
		{
			str += "";
			var trimmedString = str.substr(0, length);
			return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
		}

		var filesize = function( size )
		{

			// what sizes are we working w/?
			// megabytes or kilobytes.
			var large = size > 1000000;

			// set size label
			var label = large ? "Mb" : "Kb";

			if( large )
			{
				size = (size/1024/1024).toFixed(2);
			}
			else
			{
				size = (size/1024).toFixed(2);
			}

			// add commas.
			return currency( size,2 ).substr(1) + label;

		}

		var phone = function( str )
		{

			if( str === null ){ return; }

			str = String(parseInt(str));

			switch( str.length ){
				
				case 11:
					return	str.substring(0,1) + ' '
						+	'(' + str.substring(1,4) + ') '
						+	str.substring(4,7) + '-'
						+	str.substring(7,11);
				case 10:
					return	'(' + str.substring(0,3) + ') '
						+	str.substring(3,6) + '-'
						+	str.substring(6,10);
				case 7:
					return	str.substring(0,3) + '-'
						+	str.substring(3,7);
				default: return str;
			}

		}

		return {
			currency: currency,
			ucfirst: ucfirst,
			ucwords: ucwords,
			wordwrap: wordwrap,
			filesize: filesize,
			phone: phone
		}

	}

	angular
		.module( "formatter", [] )
		.constant( "MODULE_VERSION", "0.0.1" )
		.service( 'Formatter',[ Formatter ] );


})();
/**
 * @ngdoc overview
 * @name Atlas Logging Module
 * @description
 * Tracks application performance &
 * system messaging.
 * Creates Stacktrace for debugging.
 * @notes https://engineering.talis.com/articles/client-side-error-logging/
 * @since 2016-06-01
 * @module validation
 * @version 0.0.1
 */
(function(){

	"use strict";

	/**
	* Service that gives us a nice Angular-esque wrapper around the
	* stackTrace.js pintStackTrace() method. 
	*/
	
	
	/**
	 * @ngdoc service
	 * @name Atlas Logging Trace Service.
	 * @description
	 * Service wrapper for StackTrace JS object.
	 * Prepares the exception for trace.
	 * @since 2016-06-01
	 * @module logging
	 * @version 0.0.1
	 */
	function traceService()
	{
		return({ print: StackTrace.fromError });
	}



	/**
	 * @ngdoc function
	 * @name Atlas Logging Exception Handler Provider.
	 * @description
	 * Sets Angular's exception handler to 
	 * use our exceptionLoggingService
	 * for exceptions.
	 * @since 2016-06-01
	 * @module logging
	 * @version 0.0.1
	 */
	function exceptionHandler()
	{
		return({ $get: function( exceptionLoggingService ){ return( exceptionLoggingService ); } });
	}



	/**
	 * @ngdoc service
	 * @name Atlas Exception Logging Service.
	 * @description
	 * Exception Logging Service, currently only used by the $exceptionHandler
	 * it preserves the default behaviour ( logging to the console) but 
	 * also posts the error server side after generating a stacktrace.
	 * @since 2016-06-01
	 * @module logging
	 * @version 0.0.1
	 */
	function exceptionLoggingService( $log, $window, traceService )
	{

		var use_logging_service = false;

		var payload = {}

		function sendErrorToLoggingService( stackTraceFrames )
		{
	
			// use AJAX to post stack trace AND DO  
			// NOT use an angular service such as $http 
			// since the exception could have stopped the
			// angular application from running.
			payload.stackTrace = stackTraceFrames;

			if( use_logging_service )
			{
				$.ajax({
				    type: "POST",
				    url: "/logger", 
				    contentType: "application/json",
				    data: angular.toJson( payload )
				});
			}

		}
	
	
	    function error(exception, cause){
	
	        // preserve the default behaviour which will log the error
	        // to the console, and allow the application to continue running.
	        $log.error.apply($log, arguments);
	
	        // now try to log the error to the server side.
	        try{

				// set location href.
				payload.url = $window.location.href;

				// set log type
				payload.type = "exception";

				// set cause
				payload.cause = ( cause || "" );

				// grab & set error message.
	            payload.message = exception.toString();

				// use our traceService to generate a stack trace.
				// A promise will be returned including the
				// stackTrace in the form of objects nested 
				// within an array.
				traceService
					.print( exception )
					.then(sendErrorToLoggingService)
					.catch(function(){ console.log( "Caught Exception:  ", arguments ); });
	
	
	        } catch (loggingError){
	            $log.warn("Error server-side logging failed");
	            $log.log(loggingError);
	        }
	    }

	    return(error);

	}

	/**
	 * @ngdoc service
	 * @name Atlas Application Logging Service.
	 * @description
	 * Application Logging Service to give us a way of logging 
	 * error / debug statements from the client to the server.
	 * @since 2016-06-01
	 * @module logging
	 * @version 0.0.1
	 */
	function applicationLoggingService( $log, $window )
	{

        return({
            error: function(message){

                // preserve default behaviour
                $log.error.apply($log, arguments);

                // send server side
                $.ajax({
                    type: "POST",
                    url: "/logger",
                    contentType: "application/json",
                    data: angular.toJson({
                        url: $window.location.href,
                        message: message,
                        type: "error"
                    })
                });
            },
            debug: function(message){

                $log.log.apply($log, arguments);

                $.ajax({
                    type: "POST",
                    url: "/clientlogger",
                    contentType: "application/json",
                    data: angular.toJson({
                        url: $window.location.href,
                        message: message,
                        type: "debug"
                    })
                });
            }
        });
	}

	angular.module( "logging", [] )
		.constant( "MODULE_VERSION", "0.0.1" )
		.factory( "traceService", [ traceService ] )
		.provider( "$exceptionHandler", [ exceptionHandler ] )
		.factory( "exceptionLoggingService", [ "$log","$window", "traceService", exceptionLoggingService ] )
		.factory( "applicationLoggingService", [ "$log", "$window", applicationLoggingService ] );


})();
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
/**
 * @ngdoc overview
 * @name Image PreLoader
 * @description
 * Image PreLoader Service Module.
 * @author Steven Waskey
 * @since 2016-05-23
 * @module utilities
 * @version 0.0.1
 */
(function(){

	"use strict";

	/**
	 * @ngdoc service
	 * @name PreLoader
	 * @description
	 * Preloads images for use in angular scripts.
	 * 
	 * @param {Object} $q Inject the `$q` promise provider.
	 * @param {Object} $rootScope Inject the `$rootScope` provider.
	 */
	function PreLoader( $q, $rootScope ){

		/**
		* @ngdoc method
		* @name PreLoader
		* @methodOf PreLoader
		* @description
		* Core function to used to pre-load images.
		* @param {Object} imageLocations Array of image source uris.
		*/
	    function PreLoader( imageLocations ) {

	        // img sources
	        this.imageLocations = imageLocations;
	
	        // track images, & those loaded vs. failed.
	        this.imageCount = this.imageLocations.length;
	        this.loadCount = 0;
	        this.errorCount = 0;
	
	        // img preload status
	        this.states = {
	            PENDING: 1,
	            LOADING: 2,
	            RESOLVED: 3,
	            REJECTED: 4
	        };
	
	        // current preloader status
	        this.state = this.states.PENDING;
	
	        // return promise.
	        this.deferred = $q.defer();
	        this.promise = this.deferred.promise;
	
	    }
	
		/**
		* @ngdoc method
		* @name preloadImages
		* @methodOf PreLoader
		* @description
		* Reload the imgs array and return a promise. 
		* @param {Object} imageLocations Array of image source uris.
		* @returns {Object} Returns promise with array of imgs locations on resolve.
		*/
	    PreLoader.preloadImages = function( imageLocations ) {
	        var preloader = new PreLoader( imageLocations );
	        return( preloader.load() );
	    };
	
	
	
		/**
		* @ngdoc property
		* @name prototype
		* @propertyOf PreLoader
		* @description
		* Prototypes the object definition.
		*/
	    PreLoader.prototype = {
	
	        // Best practice for "instnceof" operator.
	        constructor: PreLoader,
	
	
	    	// -----------------------------------
	        // PUBLIC METHODS.
	
	        /**
		    * Image PreLoader isInitiated
		    * determines if the PreLoader has started loading images yet.
		    * @return Promise
		    */
	        isInitiated: function isInitiated() {
	            return( this.state !== this.states.PENDING );
	        },
	        
	        /**
		    * Image PreLoader isRejected
		    * determines if the PreLoader has failed to load all of the images.
		    * @return Promise
		    */
	        isRejected: function isRejected() {
	            return( this.state === this.states.REJECTED );
	        },
	
	        /**
		    * Image PreLoader isResolved
		    * determines if the PreLoader has successfully loaded all of the images.
		    * @return Promise
		    */
	        isResolved: function isResolved() {
	            return( this.state === this.states.RESOLVED );
	        },
	
	        /**
		    * Image PreLoader load initialization
		    * initiates the preload of the images.
		    * @return Promise
		    */
	        load: function load() {
	
	            // If the images are already loading, return the existing promise.
	            if ( this.isInitiated() ){
	                return( this.promise );
	            }
	
	            this.state = this.states.LOADING;
	
	            for ( var i = 0 ; i < this.imageCount ; i++ ){
	                this.loadImageLocation( this.imageLocations[ i ] );
	            }
	
	            // Return the deferred promise for the load event.
	            return( this.promise );
	        },
	
	
	    	// -----------------------------------
	        // PRIVATE METHODS.
	
	        /**
		    * Image PreLoader error handler
		    * handles the load-failure of the given image location.
		    */
	        handleImageError: function handleImageError( imageLocation ) {
	            this.errorCount++;
	            // If the preload action has already failed, ignore further action.
	            if ( this.isRejected() ) {
	                return;
	            }
	            this.state = this.states.REJECTED;
	            this.deferred.reject( imageLocation );
	        },
	
	        /**
		    * Image PreLoader success handler
		    * handles the load-success of the given image location.
		    */
	        handleImageLoad: function handleImageLoad( imageLocation ) {
	            this.loadCount++;
	            // If the preload action has already failed, ignore further action.
	            if ( this.isRejected() ) {
	                return;
	            }
	            // Notify the progress of the overall deferred. This is different
	            // than Resolving the deferred - you can call notify many times
	            // before the ultimate resolution (or rejection) of the deferred.
	            this.deferred.notify({
	                percent: Math.ceil( this.loadCount / this.imageCount * 100 ),
	                imageLocation: imageLocation
	            });
	            // If all of the images have loaded, we can resolve the deferred
	            // value that we returned to the calling context.
	            if ( this.loadCount === this.imageCount ) {
	                this.state = this.states.RESOLVED;
	                this.deferred.resolve( this.imageLocations );
	            }
	        },
	        
	        /**
		    * Image PreLoader image fetch
		    * loads the given image location and then wire the load / error
		    * events back into the PreLoader instance.
		    * note: The load/error events trigger a $digest.
		    */
	        loadImageLocation: function loadImageLocation( imageLocation ) {
	            var preloader = this;
	            // When it comes to creating the image object, it is critical that
	            // we bind the event handlers BEFORE we actually set the image
	            // source. Failure to do so will prevent the events from proper
	            // triggering in some browsers.
	            var image = $( new Image() )
	                .load(
	                    function( event ) {
	                        // Since the load event is asynchronous, we have to
	                        // tell AngularJS that something changed.
	                        $rootScope.$apply(
	                            function() {
	                                preloader.handleImageLoad( event.target.src );
	                                // Clean up object reference to help with the
	                                // garbage collection in the closure.
	                                preloader = image = event = null;
	                            }
	                        );
	                    }
	                )
	                .error(
	                    function( event ) {
	                        // Since the load event is asynchronous, we have to
	                        // tell AngularJS that something changed.
	                        $rootScope.$apply(
	                            function() {
	                                preloader.handleImageError( event.target.src );
	                                // Clean up object reference to help with the
	                                // garbage collection in the closure.
	                                preloader = image = event = null;
	                            }
	                        );
	                    }
	                )
	                .prop( "src", imageLocation )
	            ;
	        }
	    };
	
	    // Return the factory instance.
	    return( PreLoader );
	
	}

	angular
		.module( "PreLoader", [] )
		.constant( "MODULE_VERSION", "0.0.1" )
		.factory( "PreLoader", [ "$q", "$rootScope", PreLoader ] );

})();
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
/**
 * @ngdoc overview
 * @name Form Validator
 * @description
 * Validates Angular Forms.
 * Integrates with the 
 * formFieldValidation module.
 * @author Steven Waskey
 * @since 2016-05-23
 * @module formValidation
 * @version 0.0.1
 */
(function(){

	"use strict";

	/**
	 * @ngdoc directive
	 * @name Atlas/utilities/Validation/formValidation
	 * @description
	 * Validates angular forms & their inputs, selects, textareas, etc.
	 * 
	 * @param {Object} $timeout Inject the `$timeout` service provider.
	 */
	function formValidation( $timeout ){

		/**
		* @ngdoc method
		* @name link
		* @methodOf Atlas/utilities/Validation/formValidation
		* @description
		* Link method to formValidation directive.
		*/
		function link( scope, element, attr, formControl ){

			// when the 'validate-form' event is called, 
			// check any individual inputs w/ the form-field-validation 
			// attr for their validity.

			// We take this extra step because it ensures
			// that the user is prompted w/ any invalid
			// fields that they never focused on, or 'touched'
			scope.$on('validate-form', function( evt, args ) {

				// are we checking a specific form? 
				// see if a form name was passed in.
				if( args.hasOwnProperty( 'name' ) ){

					// if the validting form name doesnt match the 
					// name passed in, it's not the form we're 
					// trying to validate.
					if( args.name !== attr.name ){ return; }
				}

				// broadcast event to check individual 
				// form fields.
				scope.$broadcast('validate-form-field');

				// return response if callback exists.
				if( args.hasOwnProperty( 'callback' ) ){
					args.callback( formControl );
				}

			})

		}

		return {
			restrict: 'A',
			require: '^form',
			link: link
		}

	}

	angular
		.module( "formValidation", [ "formFieldValidation" ] )
		.constant( "MODULE_VERSION", "0.0.1" )
		.directive( "formValidation", [ "$timeout", formValidation ] );


})();
/**
 * @ngdoc overview
 * @name Form Field Validator
 * @description
 * Validates Angular form fields.
 * @author Steven Waskey
 * @since 2016-05-23
 * @module formFieldValidation
 * @version 0.0.1
 */
(function(){

	"use strict";

	/** 
	 * @ngdoc object
	 * @name validationRules
	 * @description
	 * Provides set of pre-defined regex patterns
	 * to be used for validation measures throughout
	 * the application.
	 * The object must be injected as a dependency
	 * for usage in controllers.
	 */
	var validationRules = {
		integer: "^\\d$",
		name: "^[a-zA-Z]+(([\\'\\,\\.\\- ][a-zA-Z ])?[a-zA-Z]*)*$",
		email: "^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$",
		phone: "^1?[-\\. ]?(\\(\\d{3} \\)?[-\\. ]?|\\d{3}?[-\\. ]?)?\\d{3}?[-\\. ]?\\d{4}$"	
	}

	/**
	 * @ngdoc directive
	 * @name Atlas/utilities/Validation/formValidation/formFieldValidation
	 * @description
	 * Validates angular fields (inputs, selects, textareas, etc.)
	 * 
	 * @param {Object} $timeout Inject the `$timeout` service provider.
	 */
	function formFieldValidation(){

		/**
		* @ngdoc method
		* @name link
		* @methodOf Atlas/utilities/Validation/formValidation/formFieldValidation
		* @description
		* Link method to formFieldValidation directive.
		*/
		function link( scope, elem, attrs, ctrl ){

			scope.$on('validate-form-field', function() {

				var invalid;
				var pattern;

				// is the field required?
				if( attrs.hasOwnProperty( 'required' ) ){						
					invalid = ( ctrl.$modelValue === null || typeof ctrl.$modelValue === 'undefined' || String(ctrl.$modelValue).length === 0 );
					ctrl.$setValidity( 'required',!invalid ); // false = ng-invalid-required
					ctrl.$setTouched();

					// If the field is required, and it failed, 
					// stop here.  No need to validate other tests.
					if( invalid ){ return; }

				}


				// does the field have a pattern regex?
				// we only test it if it has a value.
				if( attrs.hasOwnProperty( 'pattern' ) && ( ctrl.$modelValue !== null && typeof ctrl.$modelValue !== 'undefined' ) ){
					pattern = new RegExp( attrs.pattern );
					invalid = !pattern.test(ctrl.$modelValue);
					ctrl.$setValidity( 'pattern',!invalid );
					ctrl.$setTouched();
				}else{
					ctrl.$setTouched();
				}

				// should we run any custom validation measures?
				if( attrs.hasOwnProperty( "formFieldValidation" ) ){

					switch( attrs.formFieldValidation.toLowerCase() ){

						// make sure the model is a JS date object
						case "date_obj":
							ctrl.$setValidity( 'pattern',attrs.hasOwnProperty( 'required' ) ? ctrl.$modelValue instanceof Date : ( typeof ctrl.$modelValue === 'undefined' || ctrl.$modelValue instanceof Date ) );
							ctrl.$setTouched();
							break;


					}

				}

			});

		}

		return {
			require: 'ngModel',
			link: [ 'scope', 'elem', 'attrs', 'ctrl', link ]
		}
	}

	angular
		.module( "formFieldValidation", [] )
		.constant( "MODULE_VERSION", "0.0.1" )
		.value( "validationRules", validationRules )
		.directive( "formFieldValidation", [ "$timeout", formFieldValidation ] );


})();