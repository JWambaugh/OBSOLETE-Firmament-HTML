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

FRenderable.prototype=new FWorldPositional;
FRenderable.prototype.constructor=FRenderable;
function FRenderable(){
	this.renderer = null;
    this.imageScale = 100;
	this.zPosition = 0;
	this.color="#000000";
}





FRenderable.prototype.getRelativeCameraPosition=function(cameraPosition){
	if(this.positionBase == 'c')return this.position;
	
};

FRenderable.prototype.getImageScale=function(){
	return this.imageScale;
}

FRenderable.prototype.getShapes=function(){
	
	return [];
}

FRenderable.prototype.setRenderer=function(r){
	this.renderer=r;
};


FRenderable.prototype.getRenderer=function(){
	return this.renderer;
};


FRenderable.prototype.getCurrentImage=function(){
	return null;
}

FRenderable.prototype.getZPosition=function(){
	return this.zPosition;
}

FRenderable.prototype.setZPosition=function(z){
	this.zPosition=z;
}

FRenderable.prototype.setColor=function(c){
	this.color=c;
}

FRenderable.prototype.getColor=function(){
	return this.color;
}



