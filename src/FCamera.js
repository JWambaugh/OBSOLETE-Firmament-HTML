

/**
 * FCamera Class
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


FCamera.prototype.render=function(worlds){
	var cxt = this.getCanvas().getContext('2d');
	cxt.clearRect(0, 0, this.width, this.height);

	this.emit('beginRender',[cxt]);
	for(var x=0;x<worlds.length;x++){
		var world = worlds[x];
		//just grab entities that are inside the camera for rendering
		var entities=world.getEntitiesInBox(this.position.x+this.width/2/this.zoom,this.position.y+this.height/2/this.zoom,this.position.x-this.width/2/this.zoom,this.position.y-this.height/2/this.zoom);
		Firmament.log(entities);
		for(var y=0;y<entities.length;y++){
			var ent = entities[y];
			ent.getRenderer().render(cxt,ent,this);
		}
	}
	
	this.emit('endRender',[cxt]);
};


FCamera.prototype.getCanvas = function(){
	return this.canvas;
}

FCamera.prototype.setGame=function(g){
	this.game = g;
};


/**
 * Sets the width of the camera's display
 * @param {FVector} width
 */

FCamera.prototype.setWidth=function(w){
    this.width=w;
    this.calculateTopLeftPosition();
};

FCamera.prototype.getWidth=function(){
	return this.width;
}

/**
 * Sets the width of the camera's display
 * @param {FVector} width
 */

FCamera.prototype.setHeight=function(h){
    this.height=h;
    this.calculateTopLeftPosition();
};

FCamera.prototype.getHeight=function(){
	return this.height;
}


FCamera.prototype.getZoom=function(){
	return this.zoom;
}

FCamera.prototype.setZoom=function(z){
	this.zoom=z;
	this.calculateTopLeftPosition();
}



FCamera.prototype.setPosition=function(pos){
	this.position=pos;
	this.calculateTopLeftPosition();
}

FCamera.prototype.getTopLeftPosition=function(){
	return this.topLeftPosition;
}

FCamera.prototype.calculateTopLeftPosition=function(){
	this.topLeftPosition.x=this.position.x-(this.width/this.zoom)/2;
	this.topLeftPosition.y=this.position.y-(this.height/this.zoom)/2;
}