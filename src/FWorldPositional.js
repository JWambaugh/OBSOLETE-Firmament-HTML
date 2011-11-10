
/**
 * A positional object has a position in the game world.
 */
FWorldPositional.prototype=new FObservable;
FWorldPositional.prototype.constuctor=FWorldPositional;
FWorldPositional.prototype.parent=FObservable.prototype;
function FWorldPositional(){
	this.position = new FVector(0,0);
    this.positionBase='w'; //'w' = world based, 'c' = camera based
    this.angle=0;
	
}





FWorldPositional.prototype.setPosition=function(p){
	this.position = p;
};


FWorldPositional.prototype.getPosition=function(){
	return this.position;
};


FWorldPositional.prototype.getPositionX=function(){
	return this.getPosition().x;
};
FWorldPositional.prototype.getPositionY=function(){
	return this.getPosition().y;
};


FWorldPositional.prototype.getAngle=function(){
	
	return 0;
}

