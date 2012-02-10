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
 * Manages sound objects and their playback 
 * @class FSoundManager
 * 
 */



function FSoundManager(){
	this.cache={};
	this.playerPool = new FResourcePool(FSoundPlayer);
	
}


FSoundManager.prototype = new FObservable();

FSoundManager.prototype.loadSound=function(audioFile,duration){
	this.cache[audioFile]={};
	this.cache[audioFile].sound = new FSound(audioFile,duration);
	//preload it 
	this.cache[audioFile].player = new FSoundPlayer(this.cache[audioFile].sound);
	return this.cache[audioFile].sound;
}

FSoundManager.prototype.getSoundPlayer=function(sound){
	var soundP = this.playerPool.get();
	
	soundP.disconnect();
	soundP.setSound(sound);
	soundP.connect("canCleanUp",function(player){this.playerPool.addBack(player)}.bind(this));
	return soundP;
}


FSoundManager.prototype.play=function(sound){
	var soundP = this.getSoundPlayer(sound);
	
	soundP.play();
	return soundP;
}



