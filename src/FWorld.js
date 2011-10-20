

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