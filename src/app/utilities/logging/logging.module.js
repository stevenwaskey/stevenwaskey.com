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