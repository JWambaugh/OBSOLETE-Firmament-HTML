/**
 * Shows a list of available tools
 */


console.log('this is loaded');

ToolUI.toolList = [
                   {name:'Entity Editor',file:'entityEditor/entityEditor.js'}
                   
                   ]


var select = document.createElement('select');


var option = document.createElement('option');
option.value = "";
option.innerHTML = '-- Select A Tool --';
select.appendChild(option);

for(var x=0;x<ToolUI.toolList.length;x++){
	var option = document.createElement('option');
	option.value = ToolUI.toolList[x].file;
	option.innerHTML = ToolUI.toolList[x].name;
	select.appendChild(option);
}


ToolUI.render('header',select);