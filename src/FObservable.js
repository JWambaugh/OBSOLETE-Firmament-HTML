/**
 * 
 */



function FObservable(){
	//this._connections={};
}



FObservable.prototype.connect=function(eventName,func,scope){
	if(this._connections==undefined)this._connections={};
	if(this._connections[eventName] == undefined){
		this._connections[eventName]=[];
	}
	if(scope==undefined)scope=this;
	this._connections[eventName].push({
			func:func
			,scope:scope
		});
}

FObservable.prototype.disconnect=function(eventName,func){
	if(this._connections==undefined)this._connections={};
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
	if(this._connections==undefined)this._connections={};
	var connections=this._connections[eventName];
	if(connections != undefined){
		for(var x=0;x<connections.length;x++){
			connections[x].func.apply(connections[x].scope,params);
		}
	}
	
}

