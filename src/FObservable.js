/**
 * 
 */



function FObservable(){
	this._connections={};
}



FObservable.prototype.connect=function(eventName,func){
	if(this._connections[eventName] == undefined){
		this._connections[eventName]=[];
	}
	
	this._connections[eventName].push(func);
}

FObservable.prototype.disconnect=function(eventName,func){
	//only remove specified function
	if(func != undefined){
		var connections=this._connections[eventName];
		if(connections != undefined){
			for(var x=0;x<connections.length;x++){
				if(connections[x]==func){
					connections.splice(x,1);
				}
			}
		}
	} else{
		//remove all functions connected to event
		this._connections[eventName]=[];
	}
}


FObservable.prototype.emit=function(eventName,params){
	
	var connections=this._connections[eventName];
	if(connections != undefined){
		for(var x=0;x<connections.length;x++){
			connections[x].apply(null,params);
		}
	}
	
}

