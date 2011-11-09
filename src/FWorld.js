

function FWorld(){
	
	
	
}


FWorld.prototype={
		
	entities: []
		
};



FWorld.prototype.step=function(){};

FWorld.prototype.addEntity=function(ent){
	this.entities.push(ent);
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