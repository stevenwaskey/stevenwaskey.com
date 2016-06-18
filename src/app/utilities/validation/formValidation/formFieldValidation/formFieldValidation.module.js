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