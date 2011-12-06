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


FWorldPositional.prototype=new FObservable;
FWorldPositional.prototype.constuctor=FWorldPositional;
FWorldPositional.prototype.parent=FObservable.prototype;
/**
 * A positional object has a position in the game world.
 * @class
 * @extends FObservable
 */
function FWorldPositional(){
	this.position = new FVector(0,0);
    this.positionBase='w'; //'w' = world based, 'c' = camera based
    this.angle=0;
	
}




/**
 * Sets the position of the center of the object in 2D space.
 * @param {FVector} p
 * @see FWorldPositional#getPosition
 */
FWorldPositional.prototype.setPosition=function(p){
	this.position = p;
};

/**
 * Returns the position of the object in @D space.
 * @see FWorldPositional#setPosition
 * @return {FVector} position
 */
FWorldPositional.prototype.getPosition=function(){
	return this.position;
};

/**
 * Returns the x coordinate of the object's current position 
 * @return {Number} the x coordinate
 */
FWorldPositional.prototype.getPositionX=function(){
	return this.getPosition().x;
};

/**
 * Returns the Y coordinate of the object's current position
 * @returns {Number} the Y coordinate
 */
FWorldPositional.prototype.getPositionY=function(){
	return this.getPosition().y;
};

/**
 * Returns the current angle of the positional object.
 * @returns {Number} the angle in radians
 */
FWorldPositional.prototype.getAngle=function(){
	
	return 0;
}

/**
 * Sets the current angle of the object
 * @param {number} a the angle in radians
 */
FWorldPositional.prototype.setAngle=function(a){
	
}