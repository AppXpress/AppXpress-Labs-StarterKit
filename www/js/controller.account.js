angular.module('starter.controllers')

.controller('AccountCtrl', function($scope, fileUpload) {
	$scope.settings = {
		enableFriends : true
	};
	
	$scope.uploadFile = function(){
		console.log("File upload called");
		var endPointUrl = "";
		var authentication = "";
		var fileName = "";
		var fileUrl = "";
		fileUpload.uploadFile(endPointUrl, authentication, fileName, fileUrl);
	};
});