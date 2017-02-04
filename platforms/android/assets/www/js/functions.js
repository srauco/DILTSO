

function getDate(strDate){
	if(strDate == null) {
		var d = new Date()
	} else {
		var d = new Date(strDate)
	};
	var strYear = d.getFullYear();
	var strMonth = d.getMonth() + 1;
	var strDate = d.getDate();
	if (strMonth < 10) strMonth = "0" + strMonth;
	if (strDate < 10) strDate = "0" + strDate;
	var strMyDate = (strYear + "-" + strMonth + "-" + strDate);
	return strMyDate;
}

function getTime(){
	var d = new Date()
	var strHour = d.getHours();
	var strMinutes = d.getMinutes();
	var strSeconds = d.getSeconds();
	var strMeridian = "AM";
	if(strHour > 12){
		strMeridian = "PM";
		strHour = strHour - 12;
	}
	if (strHour < 10) strHour = "0" + strHour;
	if (strMinutes < 10) strMinutes = "0" + strMinutes;
	if (strSeconds < 10) strSeconds = "0" + strSeconds;
	var strMyTime = (strHour + "-" + strMinutes + "-" + strSeconds + " " + strMeridian);
	return strMyTime;
}