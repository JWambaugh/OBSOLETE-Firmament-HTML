/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */


/**
 * Base class for observable objects. 
 * Objects inheriting from FObservable may emit signals which may be connected to by other objects.
 * A signal may be any event that the object wants to expose to others. 
 * A signal may be emitted via the {@link FObservable#emit} function.
 * Use {@link FObservable#connect} to connect a callback to a signal.
 * @class
 * 
 */

function FObservable(){
	//this._connections={};
}


/**
 * Connects a callback to a signal. Any number of callbacks may be attached to a signal.
 * When the signal is emitted, callbacks will always be called in the order they were connected.
 * @param {String} signalName The name of the signal to connect to
 * @param {Function} func The callback function
 * @param {Object} scope The object to be used as the 'this' within the callback.
 * @see FObservable#disconnect
 */
FObservable.prototype.connect=function(signalName,func,scope){
	if(this._connections==undefined)this._connections={};
	if(this._connections[signalName] == undefined){
		this._connections[signalName]=[];
	}
	if(scope==undefined)scope=this;
	this._connections[signalName].push({
			func:func
			,scope:scope
		});
}

/**
 * Disconnects a callback from the specified signal.
 * If func is not provided, removes all callbacks from the signal.
 * If no parameters are provided, all connections will be removed.
 * @param {String} signalName
 * @param {Function} func
 */
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
	} else if(eventName != undefined){
		//remove all functions connected to event
		this._connections[eventName]=[];
	} else {
		this._connections={};
	}
}

/**
 * Emits a signal of type sygnalName, sending the array params with the signal.
 * @param {String} signalName The name of the signal
 * @param {Array} params Additional parameters to send with the signal (optional)
 */
FObservable.prototype.emit=function(signalName,params){
	if(this._connections==undefined)this._connections={};
	var connections=this._connections[signalName];
	if(params==undefined)params=[];
	if(connections != undefined){
		for(var x=0;x<connections.length;x++){
			connections[x].func.apply(connections[x].scope,params);
		}
	}
	
}

