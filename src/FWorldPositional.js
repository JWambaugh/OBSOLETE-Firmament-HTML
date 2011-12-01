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
 * A positional object has a position in the game world.
 */
FWorldPositional.prototype=new FObservable;
FWorldPositional.prototype.constuctor=FWorldPositional;
FWorldPositional.prototype.parent=FObservable.prototype;
function FWorldPositional(){
	this.position = new FVector(0,0);
    this.positionBase='w'; //'w' = world based, 'c' = camera based
    this.angle=0;
	
}





FWorldPositional.prototype.setPosition=function(p){
	this.position = p;
};


FWorldPositional.prototype.getPosition=function(){
	return this.position;
};


FWorldPositional.prototype.getPositionX=function(){
	return this.getPosition().x;
};
FWorldPositional.prototype.getPositionY=function(){
	return this.getPosition().y;
};


FWorldPositional.prototype.getAngle=function(){
	
	return 0;
}

