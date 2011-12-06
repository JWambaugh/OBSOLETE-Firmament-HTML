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
 * A camera to the game world.
 * In firmament, you use cameras to display content from the game world.
 * Cameras are attached to DOM Canvas Elements which they render to.
 *
 * @class FCamera
 * @param {CanvasElement} canvas - The canvas element on which the camera should render
 * @extends FWorldPositional
 */
function FCamera(canvas){
	this.canvas=canvas;
	this.width=canvas.width;
	this.height=canvas.height;


	this.game= null;
	this.zoom=100;
	this.topLeftPosition=new FVector();
	this.setPosition(new FVector(0,0));
}

FCamera.prototype=new FWorldPositional;


/**
 * Renders the contents of the camera onto its attached canvas.
 * This is normally called by FGame within the regular render loop.
 * @param {Array} worlds An array of {@link FWorld} objects to render.
 */
FCamera.prototype.render=function(worlds){
	var cxt = this.getCanvas().getContext('2d');
	cxt.clearRect(0, 0, this.width, this.height);

	this.emit('beginRender',[cxt]);
	var entityList=[];
	for(var x=0;x<worlds.length;x++){
		var world = worlds[x];
		//just grab entities that are inside the camera for rendering
		var entities=world.getEntitiesInBox(this.position.x-this.width/2/this.zoom,this.position.y-this.height/2/this.zoom,this.position.x+this.width/2/this.zoom,this.position.y+this.height/2/this.zoom);
		//Firmament.log(entities);
		entityList=entityList.concat(entities);
	}
	entityList.sort(function(a,b){
		return a.getZPosition()-b.getZPosition();
	});
	for(var y=0;y<entityList.length;y++){
		var ent = entityList[y];
		ent.getRenderer().render(cxt,ent,this);
	}
	
	this.emit('endRender',[cxt]);
};

/**
 * Returns the canvas that the camera is attached to
 * @returns {CanvasElement}
 */
FCamera.prototype.getCanvas = function(){
	return this.canvas;
}

/**
 * Assigns the camera to the specified {@link FGame} instance.
 * This is normally called by the FGame object itself.
 * @param {FGame} g
 */
FCamera.prototype.setGame=function(g){
	this.game = g;
};


/**
 * Sets the width of the camera's display.
 * This is normally just set to the kkwidth of the canvas element
 * @param {int} w
 */

FCamera.prototype.setWidth=function(w){
    this.width=w;
    this.calculateTopLeftPosition();
};


/**
 * Returns the width of the camera. 
 * @returns {int}
 */
FCamera.prototype.getWidth=function(){
	return this.width;
}

/**
 * Sets the height of the camera's display
 * @param {int} h
 */

FCamera.prototype.setHeight=function(h){
    this.height=h;
    this.calculateTopLeftPosition();
};
/**
 * Returns the current height of the camera.
 * @returns {int}
 */
FCamera.prototype.getHeight=function(){
	return this.height;
};

/**
 * Returns the camera's current zoom ratio.
 * @returns {Number}
 */
FCamera.prototype.getZoom=function(){
	return this.zoom;
};

/**
 * Sets the camera's zoom ratio.
 * @param {Number} z
 */
FCamera.prototype.setZoom=function(z){
	this.zoom=z;
	this.calculateTopLeftPosition();
};


/**
 * Sets the position of the center of the camera in 2D space.
 * @param {FVector} pos
 */
FCamera.prototype.setPosition=function(pos){
	this.position=pos;
	this.calculateTopLeftPosition();
};


FCamera.prototype.getTopLeftPosition=function(){
	return this.topLeftPosition;
};

FCamera.prototype.calculateTopLeftPosition=function(){
	this.topLeftPosition.x=this.position.x-(this.width/this.zoom)/2;
	this.topLeftPosition.y=this.position.y-(this.height/this.zoom)/2;
};