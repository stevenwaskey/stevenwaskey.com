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