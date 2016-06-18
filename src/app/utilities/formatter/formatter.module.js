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