

/**
 * FCamera Class
 */
function FCamera(canvas){
	this.canvas=canvas;
	this.width=canvas.width;
	this.height=canvas.height;
	
}

FCamera.prototype={
		
		width: null
		,height: null
		,canvas: null
		,game: null
		,zoom:100
};

FCamera.prototype.render=function(worlds){
	var cxt = this.getCanvas().getContext('2d');
	cxt.clearRect(0, 0, this.width, this.height);
	for(var x=0;x<worlds.length;x++){
		var world = worlds[x];
		var entities = world.getAllEntities();
		for(var y=0;y<entities.length;y++){
			var ent = entities[y];
			ent.getRenderer().render(cxt,ent,this);
		}
		
	}
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
};


/**
 * Sets the width of the camera's display
 * @param {FVector} width
 */

FCamera.prototype.setHeight=function(h){
    this.height=h;
};

FCamera.prototype.getZoom=function(){
	return this.zoom;
}

