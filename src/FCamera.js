

/**
 * FCamera Class
 */
function FCamera(canvas){
	this.canvas=canvas;
	
}

FCamera.prototype={
		
		width: null
		,height: null
		,canvas: null
		,game: null
};

FCamera.prototype.render=function(worlds){
	for(var x=0;x<worlds.length;x++){
		var world = worlds[x];
		var entities = world.getAllEntities();
		
		
	}
};


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



