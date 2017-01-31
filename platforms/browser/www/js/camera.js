var pictureSource;   // picture source
var destinationType; // sets the format of returned value

function setCameraSettings(){
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
}

    // Called when a photo is successfully retrieved
    //
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
    //
    function onPhotoURISuccess(imageURI) {
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
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoURISuccess, onFail, {
		quality: 50,
		destinationType: destinationType.FILE_URI,
		saveToPhotoAlbum : true,
		}
	  );
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
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
	var d = new Date();
	var strYear = d.getFullYear();
	var strMonth = d.getMonth() + 1;
	var strDate = d.getDate();
	if (strMonth < 10) strMonth = "0" + strMonth;
	if (strDate < 10) strDate = "0" + strDate;
	var strMyDate = (strYear + "-" + strMonth + "-" + strDate);
	var n = d.getTime();
	var newFileName = n + ".jpg";
	var myFolderApp = "ADHD";

	//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys)  {
	window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(fileSys)  {
		fileSys.getDirectory("pictures/" + strRootFolder + "/" + strMyDate, {create: true, exclusive: false}, function(directory) {
			entry.moveTo(directory, entry.name,  successMove,  resOnError);
       },
       resOnError);
    },
	resOnError);
}

function successMove(entry) {
	largeImage.src = entry.fullPath
	alert(entry.fullPath)
   sessionStorage.setItem('imagepath', entry.fullPath);
}


