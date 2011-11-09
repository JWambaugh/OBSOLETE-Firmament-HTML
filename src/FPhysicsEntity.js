function FPhysicsEntity(world,config){
	this.world=world;
    this.config=config;
    var def = new b2BodyDef;
    var width=0;
    
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
    
    
    
    
    
    def.userData=this;
    //console.log(def);
    this.body=this.world.b2world.CreateBody(def);
    //process shape definitions
    for(var x=0;x<config.shapes.length;x++){
        var fixDef=new b2FixtureDef;
        var shape = config.shapes[x];
        
        if(shape.type=='box'){
            fixDef.shape=new b2PolygonShape();
            fixDef.shape.SetAsBox(shape.width/2,shape.height/2);
            width=shape.width;
        } else if(shape.type=='circle'){
        	width=shape.radius*2;
            fixDef.shape = new b2CircleShape(shape.radius);
        }
        
        fixDef.density=shape.density;
        fixDef.friction=shape.friction;
        fixDef.restitution=shape.restitution;
        //console.log(fixDef)
        this.body.CreateFixture(fixDef);
    }
    //Firmament.log(this.body);
    this.body.ResetMassData();
    this.position=this.body.m_xf.position; //tie the entity's position to the body's position
    
    //set z value
    this.zPosition =0;
    
    if(config.image){
    	//console.log(typeof(config.image))
    	if(typeof(config.image)=='string'){
    		var i= document.createElement('img');
    		i.src=config.image;
    		config.image=i;
    	}
    	this.currentImage=config.image;
    	this.setRenderer(new FSpriteRenderer);
    	
    	if(config.imageScale){
        	if(config.imageScale=='auto'){
        		if(!config.imageWidth){
        			Firmament.log("Image width must be set for auto scale! Defaulting to 1:1");
        			this.imageScale=100;
        		}else {
        			this.imageScale=config.imageWidth/width;
        		}
        	}else{
        		this.imageScale=config.imageScale;
        	}
        }
    	
    	
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






