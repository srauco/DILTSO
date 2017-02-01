
function createFolder(strFolder) {
	window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory,
		function(fileSys){fileSys.getDirectory("pictures/" + strRootFolder + "/" + strFolder, {create: true, exclusive: false}, null, null)}
	);
	return true
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
	var strUpdateDiv = '<div style="font=weight:bold;text-align: center; position: absolute; left: 50%; top: 30%; transform: translate(-50%, -30%);">No pictures for this date</div>'
	window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory,
		function(fileSys){
			fileSys.getDirectory("pictures/" + strRootFolder + "/" + strCurrentDate, {create: true, exclusive: false},
				function(directory) {
					var directoryReader = directory.createReader();
					directoryReader.readEntries(
						function(entries) {
							if(entries.length > 0){
								var i;
								strUpdateDiv = ''
								for (i=0; i < entries.length; i++) {
									strFile = cordova.file.externalRootDirectory + "/" + entries[i].fullPath
									strUpdateDiv = strUpdateDiv + '<div class="imgDisplayDiv">';
									strUpdateDiv = strUpdateDiv + '<img class="imgDisplay" src="' + strFile + '"><br />'
									strUpdateDiv = strUpdateDiv + '<span class="imgDisplayDesc">' + entries[i].name.replaceAll("-", ":").replace(".jpg", "") + '</span>';
									strUpdateDiv = strUpdateDiv + '</div><br /><hr class="imgDisplayRule">';
//									strUpdateDiv = strUpdateDiv + '<img style="box-shadow: 5px 5px 2px grey; display:block; width:85%; padding:0 0 10px 25px;" id="largeImage" src="' + strFile + '" /><br />\n\n';
								}
								strUpdateDiv = strUpdateDiv + "<br /><br /><br />"
							}
							mainDisplay.innerHTML = strUpdateDiv;
						},
						function(error){alert(error.code);}
					);
				},
			resOnError);
		},
		null
	);
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};