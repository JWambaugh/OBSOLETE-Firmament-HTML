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

function FWorld(){
	
	
	
}


FWorld.prototype={
		
	entities: []
		
};



FWorld.prototype.step=function(){};

FWorld.prototype.addEntity=function(ent){
	this.entities.push(ent);
};

FWorld.prototype.destroyEntity=function(ent){
	this.entities.splice(this.entities.indexOf(ent), 1);
};



FWorld.prototype.getAllEntities=function(){
	return this.entities;
	
};

/**
 * Returns an array of entities within the box described by the points at top left and bottom right.
 * @param bottomRightX
 * @param bottomRightY
 * @param topLeftX
 * @param topLeftY
 */
FPhysicsWorld.prototype.getEntitiesInBox=function(topLeftX,topLeftY,bottomRightX,bottomRightY){
	Firmament.log('getEntitiesInBox Not Implemented!');
}