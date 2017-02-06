
function createFolder(strFolder) {
	window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory,
		function(fileSys){
			fileSys.getDirectory("pictures/" + strRootFolder + "/" + strFolder, {create: true, exclusive: false}, null, null)
		}
	);
	return true
}

function createPastDayFolders(){
	var i;
	var d = new Date(strCurrentDate + ' 00:00:00');
	var od = new Date();

	for (i=0; i < intSaveDays; i++) {
		od.setDate(d.getDate() - i)
		strTempDate = getFolderDate(od.getMonth() + 1 + "-" + od.getDate() + "-" + od.getFullYear())
		createFolder(strTempDate)
	}
}

function getFolderDate(strDate){
	if(strDate == null) { var d = new Date() } else { var d = new Date(strDate + " 00:00:00")	}
	if(d.getMonth() + 1 < 10) {strMonth = "0" + (d.getMonth() + 1)} else {strMonth = d.getMonth() + 1 };
	if(d.getDate() < 10) {strDate = "0" + d. getDate()} else {strDate = d.getDate()};
	var strMyDate = (d.getFullYear() + "-" + strMonth + "-" + strDate);
	return strMyDate
}

function cleanOldFolders() {
	var strFolderList = ""
	window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory,
		function(fileSys) {
			fileSys.getDirectory("pictures/" + strRootFolder + "/", {create: false, exclusive: false},
				function(directory) {
					var directoryReader = directory.createReader();
					directoryReader.readEntries(
						function(entries) {
							var i;
							for (i=0; i<entries.length; i++) {
								strDayFolder = ''
								if(compareDates(entries[i].name)){
									entries[i].removeRecursively(null, null);
								} else {
									strDayType = 'event'
									if(entries[i].name == getFolderDate()) strDayType = 'today'
									strDayFolder = strDayFolder + '<li class="close-panel" onclick="switchDays(\'' + entries[i].name + '\');">\n<a href="profile.html" class="ditem-link item-content">\n'
									strDayFolder = strDayFolder + '<div class="item-media">\n'
									strDayFolder = strDayFolder + '<i class="material-icons menu" style="color:#000 !important">\n' + strDayType + '</i>\n</div>\n'
									strDayFolder = strDayFolder + '<div class="item-inner menu">\n<div class="item-title menu">\n'
									strDayFolder = strDayFolder + entries[i].name +'</div>\n</div>\n</a>\n</li>\n'
									strFolderList = strDayFolder + strFolderList
								};
							}
							spanDays.innerHTML = strFolderList
						},
						function(error){alert(error.code);}
					);
				},
			resOnError);
		},
		resOnError
	);
}

function switchDays(strDate){
	strCurrentDate = getFolderDate(strDate);
	gatherPictures();
	divCurrentSelectedDate.innerHTML = strCurrentDate
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
									//alert(entries[i].toURI());
									strFile = cordova.file.externalRootDirectory + "/" + entries[i].fullPath
									strUpdateDiv = strUpdateDiv + '<div class="imgDisplayDiv">';
									strUpdateDiv = strUpdateDiv + '<img class="imgDisplay" src="' + strFile + '" onclick="openPicture(\'' + entries[i].fullPath + '\');"><br />'
									strUpdateDiv = strUpdateDiv + '<span class="imgDisplayDesc">' + entries[i].name.replaceAll("-", ":").replace(".jpg", "") + '</span>';
									strUpdateDiv = strUpdateDiv + '</div><br /><hr class="imgDisplayRule">';
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

function openPicture(objPicture){

	alert(objPicture)


fileOpener.open("file:///" + objPicture)


	alert("done");
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};