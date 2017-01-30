
function getSettings(){
	getSaveDays();
	getLastDate();
	divCurrentSelectedDate.innerHTML = getFolderDate();
	strCurrentDate = getFolderDate();
	alert(1);
	gatherPictures();
//	getColors();
//	setColors();
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
}

function getLastDate(){
	var d = new Date();
	strLastDate = getFolderDate(d.setDate(d.getDate() - intSaveDays));
}

function setCurrentPictures(strFolder){
	divCurrentSelectedDate.innerHTML = getFolderDate(strFolder)
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
	//alert(strMainColor);
}
function setColors(){
	footerDiv.style.backgroundColor = strMainColor;
	footerParent.style.backgroundColor = strMainColor;
	btnCamera.style.backgroundColor = strMainColor;
	btnCamera.style.color = "#FFF";
}

function compareDates(strDate) {
	return (strLastDate >= strDate)
}