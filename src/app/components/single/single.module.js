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