function FPhysicsEntity(world,config){
	this.world=world;
    this.config=config;
    var def = new b2BodyDef;
    
    
    if(config.position){
        def.position.x=config.position.x;
        def.position.y=config.position.y;
    } else {
        def.position.x=0;
        def.position.y=0;
    }
    //def.fixedRotation=false;
    if(config.type=='dynamic')def.type=b2Body.b2_dynamicBody;
    else def.type=b2Body.b2_staticBody;
    if(config.angle){
    	def.angle=config.angle;
    }
    console.log(def);
    this.body=this.world.b2world.CreateBody(def);
    //process shape definitions
    for(var x=0;x<config.shapes.length;x++){
        var fixDef=new b2FixtureDef;
        var shape = config.shapes[x];
        
        if(shape.type=='box'){
            fixDef.shape=new b2PolygonShape();
            fixDef.shape.SetAsBox(shape.width,shape.height);
        } else if(shape.type=='circle'){
            fixDef.shape = new b2CircleShape(shape.radius);
        }
        fixDef.density=config.density;
        fixDef.friction=config.friction;
        fixDef.restitution=config.restitution;
        this.body.CreateFixture(fixDef);
    }
    Firmament.log(this.body);
    this.body.ResetMassData();
    this.position=this.body.m_xf.position; //tie the entity's position to the body's position
    if(config.image){
    	console.log(typeof(config.image))
    	if(typeof(config.image)=='string'){
    		var i= document.createElement('img');
    		i.src=config.image;
    		config.image=i;
    	}
    	this.currentImage=config.image;
    	this.setRenderer(new FSpriteRenderer);
    }else{
    	this.setRenderer(new FWireframeRenderer);
    }
    
}

//FEntity extends FRenderable
FPhysicsEntity.prototype = new FRenderable;

FPhysicsEntity.prototype.getShapes=function(){
	var shapes = [];
	var s = this.body.GetFixtureList();
	while(s){
		shapes.push(s.GetShape());
		s = s.GetNext();
	}
	return shapes;
}

FPhysicsEntity.prototype.getPosition=function(){
	
	return this.body.GetPosition();
}

FPhysicsEntity.prototype.getAngle=function(){
	
	return this.body.GetAngle();
}

FPhysicsEntity.prototype.getCurrentImage=function(){
	return this.currentImage;
}
