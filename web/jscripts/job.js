
function getZipCodeData(text,divID){
	var zip=text.value;//alert(zip);
	if(zip.length<5)return;
	$(divID).innerHTML="LOADING...";
	new Ajax.Updater(divID,"/jobs/ajax/getZip?zip="+zip);
}