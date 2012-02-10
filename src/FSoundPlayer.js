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
 * A sound player

 *
 * @class FSoundPlayer
 * @param {FSound} sound - the sound object to play
 * @extends FObservable
 */
function FSoundPlayer(sound){
	if(sound != undefined){
		this.audioObj = new Audio(sound.fileName);
		this.setSound(sound);
	}
	else
		this.audioObj = new Audio();
	
}




FSoundPlayer.prototype = new FObservable();

FSoundPlayer.prototype.setSound=function(sound){
	this.soundObj=sound;
	this.audioObj.src=sound.fileName;
	this.audioObj.load();
	
};

FSoundPlayer.prototype.play=function(){
	
	this.audioObj.play();
	var duration=5;//default assume 5 second duration
	if(this.audioObj.duration && ! isNaN(this.audioObj.duration));
	else if(this.soundObj.duration != undefined)duration = this.soundObj.duration;
	setTimeout(function(){this.emit("canCleanUp",[this])}.bind(this),(duration+1)*1000);
}



