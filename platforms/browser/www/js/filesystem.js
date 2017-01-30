
function createFolder(strFolder) {
	window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory,
		function(fileSys){fileSys.getDirectory("pictures/" + strRootFolder + "/" + strFolder, {create: true, exclusive: false}, null, null)}
	);
}

function getFolderDate(strDate){
	if(strDate == null) { var d = new Date() } else { var d = new Date(strDate)	}
	if(d.getMonth() + 1 < 10) {strMonth = "0" + (d.getMonth() + 1)} else {strMonth = d.getMonth() + 1 };
	if(d.getDate() < 10) {strDate = "0" + d. getDate()} else {strDate = d.getDate()};
	var strMyDate = (d.getFullYear() + "-" + strMonth + "-" + strDate);
	return strMyDate
}

function cleanOldFolders() {
	window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory,
		function(fileSys) {
			fileSys.getDirectory("pictures/" + strRootFolder + "/", {create: false, exclusive: false},
				function(directory) {
					var directoryReader = directory.createReader();
					directoryReader.readEntries(
						function(entries) {
							var i;
							for (i=0; i<entries.length; i++) { if(compareDates(entries[i].name)) entries[i].removeRecursively(null, null);};
						},
						function(error){alert(error.code);}
					);
				},
			resOnError);
		},
		resOnError
	);
}

function gatherPictures() {

	alert(2);

	window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory,
		function(fileSys) {
			fileSys.getDirectory("pictures/" + strRootFolder + "/" + strCurrentDate, {create: false, exclusive: false},
				function(directory) {
					var directoryReader = directory.createReader();
					directoryReader.readEntries(
						function(entries) {
							if(entries.length > 0){
								var i;
								for (i=0; i < entries.length; i++) {
									alert(entries[i].name);
								}
							} else {
								alert("empty");
							}
						},
						function(error){alert(error.code);}
					);
				},
			resOnError);
		},
		resOnError
	);

}
