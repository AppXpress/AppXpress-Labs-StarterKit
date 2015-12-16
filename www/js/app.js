// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [ 'ionic', 'starter.controllers', 'starter.services', 'pascalprecht.translate' ])

.run(function($ionicPlatform, $translate) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory
		// bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
		}
		if (typeof navigator.globalization != "undefined") {

			navigator.globalization.getLocaleName(function(locale) {

				if (typeof console != "undefined") {
					console.log('locale: ' + locale.value + '\n');
				}
				// use is async with un-known language keys
				$translate.use((locale.value).split("-")[0]).then(function(data) {
					if (typeof console != "undefined") {
						console.log("SUCCESS -> " + data);
					}

				}, function(error) {
					if (typeof console != "undefined") {
						console.log("ERROR -> " + error);
					}
					alert("Failed to set locale based on the device locale");
				});
			}, function(e) {

				if (typeof console != "undefined") {
					console.log("Error code: " + e.code + " error msg: " + e.message);
				}
				alert('Error getting language\n');

			});
		} else {
			if (typeof console != "undefined") {
				console.log("Globalization plugin is not activated");
			}
		}
		//menuService.init();

	});
}).config(function($stateProvider, $urlRouterProvider, $translateProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider
	
	// setup an abstract state for the tabs directive
	.state('login', {
		url : "/login",
		views : {
			'' : {
				templateUrl : "templates/login.html",
				controller : 'LoginCtrl'
			}
		}
	})

	// setup an abstract state for the tabs directive
	.state('tab', {
		url : "/tab",
		abstract : true,
		templateUrl : "templates/tabs.html"
	})

	// Each tab has its own nav history stack:

	.state('tab.dash', {
		url : '/dash',
		views : {
			'tab-dash' : {
				templateUrl : 'templates/tab-dash.html',
				controller : 'DashCtrl'
			}
		}
	})

	.state('tab.chats', {
		url : '/chats',
		views : {
			'tab-chats' : {
				templateUrl : 'templates/tab-chats.html',
				controller : 'ChatsCtrl'
			}
		}
	}).state('tab.chat-detail', {
		url : '/chats/:chatId',
		views : {
			'tab-chats' : {
				templateUrl : 'templates/chat-detail.html',
				controller : 'ChatDetailCtrl'
			}
		}
	})

	.state('tab.account', {
		url : '/account',
		views : {
			'tab-account' : {
				templateUrl : 'templates/tab-account.html',
				controller : 'AccountCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

	// Angular Translate
	$translateProvider.useStaticFilesLoader({
		prefix : 'js/locales/locale-',
		suffix : '.json'
	}).registerAvailableLanguageKeys([ 'en', 'de', 'fr', 'es', 'it' ], {
		'en-*' : 'en',
		'de-*' : 'de',
		'fr-*' : 'fr',
		'es-*' : 'es',
		'it-*' : 'it'
	}).preferredLanguage('en').fallbackLanguage("en").useSanitizeValueStrategy('sanitize');
	;

});
