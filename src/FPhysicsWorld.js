


function FPhysicsWorld(gravity){
	this.b2world = new b2World(
            new b2Vec2(gravity.x, gravity.y)    //gravity
         ,  true                 //allow sleep
      );
	
}


//extends FWorld
FPhysicsWorld.prototype = new FWorld;



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
	//Firmament.log(this);
    var ent= new FPhysicsEntity(this,config);
    this.addEntity(ent);
    return ent;
};



FPhysicsWorld.prototype.getEntitiesInBox=function(upperBoundX,upperBoundY,lowerBoundX,lowerBoundY){
	var selectEntities=[];
	var query = new Box2D.Collision.b2AABB;
	
	query.upperBound.Set(upperBoundX,upperBoundY);
    query.lowerBound.Set(lowerBoundX,lowerBoundY);
    //Firmament.log(query,true);
    //Firmament.log(query);
    this.b2world.QueryAABB(function(fixture){
    	//Firmament.log("here");
    	selectEntities.push(fixture.GetBody().GetUserData());
    	return true;
    },query);
    Firmament.log(selectEntities.length);
    return selectEntities;
}



