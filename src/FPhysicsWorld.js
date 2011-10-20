


function FPhysicsWorld(gravity){
	this.b2world = new b2World(
            new b2Vec2(gravity.x, gravity.y)    //gravity
         ,  true                 //allow sleep
      );
	
}


//extends FRenderable
FPhysicsWorld.prototype = Object.create(FWorld);



FPhysicsWorld.prototype.step=function(){
	
	this.b2world.Step(
            1 / 60   //frame-rate
         ,  10       //velocity iterations
         ,  10       //position iterations
      );
	//this.world.DrawDebugData();
	this.b2world.ClearForces();
}


FPhysicsWorld.prototype.createEntity=function(config){
	Firmament.log(this);
    var ent= new FPhysicsEntity(this,config);
    this.addEntity(ent);
    return ent;
};




