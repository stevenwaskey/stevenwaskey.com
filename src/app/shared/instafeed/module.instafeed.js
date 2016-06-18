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