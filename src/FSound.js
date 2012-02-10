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
 * A single sound asset

 *
 * @class FSound
 * @param {string} fileName - The name of the audio file
 * @extends FObservable
 */
function FSound(fileName,duration){
	
	this.fileName = fileName;
	this.duration=duration;
	
}
FSound.prototype = new FObservable();


/**
 * Gets plays the audio asset and returns the FSoundPlayer that is playing it.
 * @returns
 */
FSound.prototype.play = function(){
	return Firmament.getSoundManager().play(this);
}