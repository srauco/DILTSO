
// Called when a photo is successfully retrieved
function onPhotoDataSuccess(imageData) {
  // Get image handle
  var smallImage = document.getElementById('smallImage');
  // Unhide image elements
  smallImage.style.display = 'block';
  // Show the captured photo
  // The in-line CSS rules are used to resize the image
  smallImage.src = "data:image/jpeg;base64," + imageData;
  document.getElementById("smallImage").innerHTML = imageData;
}

// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
  alert("URI: " + imageURI)
  movePic(imageURI);
  // Get image handle
  var largeImage = document.getElementById('smallImage');
  // Unhide image elements
  largeImage.style.display = 'block';
  // Show the captured photo
  // The in-line CSS rules are used to resize the image
  largeImage.src = imageURI;
}

// A button will call this function
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoURISuccess, onFail, {
	quality: 50,
	destinationType: destinationType.FILE_URI,
	saveToPhotoAlbum : false,
	}
  );
}

// A button will call this function
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}

// Called if something bad happens.
function onFail(message) {
  alert('Failed because: ' + message);
}

function movePic(file){
	window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError);
}
function resOnError(e){
	alert("Error");
}

function resolveOnSuccess(entry){
	var strMyDate = getDate();
	var newFileName = getTime() + ".jpg";
	window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory,
		function(fileSys) {
			fileSys.getDirectory("pictures/" + strRootFolder + "/" + getDate(), {create: true, exclusive: false},
			function(directory) {
				entry.moveTo(directory, newFileName, gatherPictures, resOnError);
       		},
			resOnError);
    	},
		resOnError
	);
}

function successMove(){
//	gatherPictures();
}

function success(){
	alert("S")
}

function fail(){
	alert("F")
}
