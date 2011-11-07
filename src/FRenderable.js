
function FRenderable(){
	this.renderer= null;
    this.imageScale=100;
	
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


