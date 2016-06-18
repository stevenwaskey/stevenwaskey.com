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