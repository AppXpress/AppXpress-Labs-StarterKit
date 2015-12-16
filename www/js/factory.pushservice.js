/*
 * Unified Push Notification Service.
 * Author: NThusitha
 * Date: 23-Sep-2015
 * 
 * */
angular.module('starter.services').factory('PushService', function($http, $cordovaPush, $cordovaDevice, $log){
	
	var onRegistrationCallback_, onNotificationCallback_, unregistrationCallback_;
	
	/*
	 * Bootstrap push plugin.
	 * */
	function register_(onRegisterCallback, notificationCallback){
		
		//deviceReadyCall back (deviceToken will get passed to the callback)
		onRegistrationCallback_ = onRegisterCallback;
		
		//called upon receiving the notification.
		onNotificationCallback_ = notificationCallback;
		
		var platform = $cordovaDevice.getPlatform();
		
		switch(platform){
			
			case "iOS" : 
				$log.debug("platform is ios");
				var iosConfig = {
					    "badge": true,
					    "sound": true,
					    "alert": true,
					  };
				
				var options = {};

					  document.addEventListener("deviceready", function(){
					    $cordovaPush.register(iosConfig).then(function(deviceToken) {
					      // Success -- send deviceToken to server, and store for future use
					      $log.debug("deviceToken: " + deviceToken)
					      onRegistrationCallback_(deviceToken);
					    }, function(err) {
					      $log.error("Registration error (APNS): " + err)
					    });


					    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
					    	$log.debug("notification received");
					      if (notification.alert) {
					        navigator.notification.alert(notification.alert);
					      }

					      if (notification.sound) {
					        var snd = new Media(event.sound);
					        snd.play();
					      }
					      //upon receiving the notification.
					      onNotificationCallback_(notification);

					      if (notification.badge) {
					        $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {
					          $log.debug("set the badge number"  + result);
					        }, function(err) {
					        	$log.debug("error occured setting badge number");
					        });
					      }
					    });
					  }, false);
				break;
			
			case "Android" :
				$log.debug("platform is android");
				var androidConfig = {
					    "senderID": "replace_with_sender_id",
					  };

					  document.addEventListener("deviceready", function(){
					    $cordovaPush.register(androidConfig).then(function(result) {
					    	//onRegistrationCallback_(result);
					    	$log.debug("successfully registered");
					    }, function(err) {
					    	$log.error("Registration error (GCM) :" + err);
					    })

					    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
					      switch(notification.event) {
					        case 'registered':
					          if (notification.regid.length > 0 ) {
					            $log.debug('GCM registration ID = ' + notification.regid);
					            onRegistrationCallback_(notification);
					          }
					          break;

					        case 'message':
					          // this is the actual push notification. its format depends on the data model from the push server
					          $log.debug('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
					          onNotificationCallback_(notification);
					          
					          break;

					        case 'error':
					          $log.error('GCM error = ' + notification.msg);
					          break;

					        default:
					          $log.error('An unknown GCM event has occurred');
					          break;
					      }
					    });

					  }, false);
				
				break;
			
			default:
			
			
			//	http://solutionoptimist.com/2013/10/07/enhance-angularjs-logging-using-decorators/
		}
	}
	
	/*
	 * Un register from the Push servers.
	 * */
	function unregister_(unregisterCallback){
		
		unregistrationCallback_ = unregisterCallback;
		 // WARNING! dangerous to unregister (results in loss of tokenID)
	    $cordovaPush.unregister(options).then(function(result) {
	    	unregistrationCallback_(result);
	    }, function(err) {
	    	$log.error("error occured unregistering : " + e);
	    });
	}

	
	
	return {
		registerPushNotifications : function(onRegistrationCallback, onNotificationCallback){
			register_(onRegistrationCallback, onNotificationCallback);
		},
		unregisterPushNotifications : function(unregisterCallback){
			unregister_(unregisterCallback);
		}
	}
	
});