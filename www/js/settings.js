
function setCameraSettings(){
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = 1 //navigator.camera.DestinationType;
	saveToPhotoAlbum = false;
}

function getSaveDays(intDays){
	if(intDays == null){
		intSaveDays = localStorage.getItem("SaveDays");
		if (intSaveDays == null){
			localStorage.setItem("SaveDays", 3);
			intSaveDays = localStorage.getItem("SaveDays");
		}
	} else {
		localStorage.setItem("SaveDays", intDays);
		intSaveDays = intDays;
	}
	var d = new Date();
	strPassDate = (d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear())
}


function getColors(strItem, strColor){
	if(strItem == null){
		strMainColor = localStorage.getItem("MainColor");
		if (strMainColor == null){
			localStorage.setItem("MainColor", "#ff0000");
			strMainColor = localStorage.getItem("MainColor");
		}
	} else {
		if(strColor == Null){

		} else {
			localStorage.setItem(strItem, strColor);
			eval("str" + strItem + " = localStorage.getItem('" + strColor + "')");
		}
	}
}
function setColors(){
	footerDiv.style.backgroundColor = strMainColor;
	footerParent.style.backgroundColor = strMainColor;
	btnCamera.style.backgroundColor = strMainColor;
	btnCamera.style.color = "#FFF";
}

function compareDates(strPassedDate) {
	return (strLastDate >= strPassedDate)
}



