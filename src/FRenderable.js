
function FRenderable(){
	this.renderer = null;
    this.imageScale = 100;
	this.zPosition = 0;
}

FRenderable.prototype=new FWorldPositional;



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
