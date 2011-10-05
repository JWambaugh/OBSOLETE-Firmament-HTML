function FEntity(game,config){
    this.config=config;
    var def = new b2BodyDef;
    if(config.position){
        def.position.x=config.position.x;
        def.position.y=config.position.y;
    } else {
        def.position.x=0;
        def.position.y=0;
    }
    
    if(config.type=='dynamic')def.type=b2Body.b2_dynamicBody;
    else def.type=b2Body.b2_staticBody;
    
    
    this.body=game.world.CreateBody(def);
    //process shape definitions
    for(var x=0;x<config.shapes.length;x++){
        var fixDef=new b2FixtureDef;
        var shape = config.shapes[x];
        
        if(shape.type=='box'){
            fixDef.shape=new b2PolygonShape();
            fixDef.shape.SetAsBox(shape.height,shape.width);
        } else if(shape.type=='circle'){
            fixDef.shape = new b2CircleShape(shape.radius);
        }
        fixDef.density=config.density;
        fixDef.friction=config.friction;
        fixDef.restitution=config.restitution;
        this.body.CreateFixture(fixDef);
    }
    window.console.log(this.body);
    this.body.ResetMassData();
    this.position=this.body.m_xf.position; //tie the entity's position to the body's position
    
}

//FEntity extends FRenderable
FEntity.prototype = Object.create(FRenderable);



