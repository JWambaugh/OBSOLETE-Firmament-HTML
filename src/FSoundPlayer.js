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




function FSoundPlayer(sound){
	this.soundObj=sound;
	this.audioObj = new Audio(sound.fileName);
	
	this.audioObj.onplay=function(){
		
		Firmament.log('Playing!');
	}
	
}

FSoundPlayer.prototype = new FObservable();


FSoundPlayer.prototype.play=function(){
	this.audioObj.play();
}

FSoundPlayer.prototype.pause=function(){
	this.audioObj.pause();
}


