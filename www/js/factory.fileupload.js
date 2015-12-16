angular.module('starter.services')
.factory('fileUpload', function(){
	
	function win(r) {
	    console.log("Code = " + r.responseCode);
	    console.log("Response = " + r.response);
	    console.log("Sent = " + r.bytesSent);
	}

	function fail(error) {
	    alert("An error has occurred: Code = " + error.code);
	    console.log("upload error source " + error.source);
	    console.log("upload error target " + error.target);
	}
	
	function uploadFile(endPointUrl, authentication, fileName, fileUrl){
		var uri = encodeURI(endPointUrl);
		console.log("url:" + uri);

		var options = new FileUploadOptions();
		options.fileKey="file";
		options.fileName=fileName;
		options.mimeType="image/jpeg";

		var headers={'Authorization': authentication , 'Connection': 'Keep-Alive', 'Content-Type': 'image/jpeg', 'Content-Disposition':'form-data; filename='+fileName };
		console.log("header: " + JSON.stringify(headers));
		//var headers = {'Authorization' : ""+authentication+""};//sending header without content-type results in default multipart data upload which gives corrupted image
		options.headers = headers;
		
		var ft = new FileTransfer();
		ft.upload(fileUrl, uri, win, fail, options);
	}
	
	return {
		uploadFile : uploadFile
	};
	
});