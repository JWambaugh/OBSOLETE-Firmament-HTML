/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */



 var   b2Vec2 = Box2D.Common.Math.b2Vec2
         	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
         	,	b2Body = Box2D.Dynamics.b2Body
         	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
         	,	b2Fixture = Box2D.Dynamics.b2Fixture
         	,	b2World = Box2D.Dynamics.b2World
         	,	b2MassData = Box2D.Collision.Shapes.b2MassData
         	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
         	,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
         	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
            ;

 /** 
  *  Firmament class
  *  @class Firmament
  * 
  */
var Firmament={
		/*
		 * Function: log
		 * Logs debug data to the console
		 */
		log:function(ob,once){
			if(window.console){
				if(once !=true || this._logHistory.indexOf(ob)==-1){
					this._logHistory.push(ob);
					window.console.log(ob);
				}
				
			}
		}
		,_logHistory:[]
		,images:{}
		
		/*
		 * Function: loadImage
		 * 
		 * Preloads an image and returns the loaded image object.
		 * 
		 * Parameters: 
		 * 		src - The url to the image
		 * 
		 * Returns:
		 * 	The loaded image element object 
		 */
		,loadImage:function(src){
			//if(this.images[src]!=undefined)return this.images[src];
			var img = document.createElement("img");
			img.src=src;
			this.images[src]=img;
			return img;
		}

		/*
		 * Function: extend
		 * 
		 * copys one object into another
		 * 
		 * Parameters:
		 * 		target - The object to copy into
		 * 		object - The object to copy
		 * 		objectcs... - More object to copy. objects will be copied from right to left.
		 */
		,extend:function() {
			 var options, name, src, copy, copyIsArray, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;

			// Handle a deep copy situation
			if ( typeof target === "boolean" ) {
				deep = target;
				target = arguments[1] || {};
				// skip the boolean and the target
				i = 2;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if ( typeof target !== "object" && !FHelper.isFunction(target) ) {
				target = {};
			}

		    //return the target if there's only one argument
			if ( length === i ) {
				return target
			}

			for ( ; i < length; i++ ) {
				// Only deal with non-null/undefined values
				if ( (options = arguments[ i ]) != null ) {
					// Extend the base object
					for ( name in options ) {
						src = target[ name ];
						copy = options[ name ];

						// Prevent never-ending loop
						if ( target === copy ) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if ( deep && copy && ( Firmament.isPlainObject(copy) || (copyIsArray = Firmament.isArray(copy)) ) ) {
							if ( copyIsArray ) {
								copyIsArray = false;
								clone = src && Firmament.isArray(src) ? src : [];

							} else {
								clone = src && Firmament.isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[ name ] = Firmament.FHelper.extend( deep, clone, copy );

						// Don't bring in undefined values
						} else if ( copy !== undefined ) {
							target[ name ] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		}

		/*
		 * Function: isArray
		 * Returns true if obj is an array
		 */
		,isArray:function(obj){
		    if(toString.call(obj)=='[object Array]')return true; else return false;
		}



		,isPlainObject:function( obj ) {
				// Must be an Object.
				// Because of IE, we also have to check the presence of the constructor property.
				// Make sure that DOM nodes and window objects don't pass through, as well
				if ( !obj ) {
					return false;
				}
				
				// Not own constructor property must be Object
				if ( obj.constructor &&
					!hasOwn.call(obj, "constructor") &&
					!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
					return false;
				}
			
				// Own properties are enumerated firstly, so to speed up,
				// if last one is own, then all properties are own.
			
				var key;
				for ( key in obj ) {}
				
				return key === undefined || hasOwn.call( obj, key );
			}


		/**
		 * Returns true if the passed object is a function
		 */
		,isFunction:function( obj ) {
				return typeof(obj)=='function'?true:false;
			}

		
		
}

Firmament.getElementOffset = function( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft //- el.scrollLeft;
        _y += el.offsetTop //- el.scrollTop;
        el = el.offsetParent;
    }
    return { y: _y, x: _x };
}












/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */

//Function.prototype.bind polyfill
if ( !Function.prototype.bind ) {

  Function.prototype.bind = function( obj ) {
    if(typeof this !== 'function') // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');

    var slice = [].slice,
        args = slice.call(arguments, 1), 
        self = this, 
        nop = function () {}, 
        bound = function () {
          return self.apply( this instanceof nop ? this : ( obj || {} ), 
                              args.concat( slice.call(arguments) ) );    
        };

    bound.prototype = this.prototype;

    return bound;
  };
}




//object.create polyfill
if (!Object.create) {
	
    Object.create = function (o) {
        if (arguments.length > 1) {
            throw new Error('Object.create implementation only accepts the first parameter.');
        }
        function F() {}
        F.prototype = o;
        return new F();
    };
}



/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */


/**
 * Base class for observable objects. 
 * Objects inheriting from FObservable may emit signals which may be connected to by other objects.
 * A signal may be any event that the object wants to expose to others. 
 * A signal may be emitted via the {@link FObservable#emit} function.
 * Use {@link FObservable#connect} to connect a callback to a signal.
 * @class
 * 
 */

function FObservable(){
	//this._connections={};
}


/**
 * Connects a callback to a signal. Any number of callbacks may be attached to a signal.
 * When the signal is emitted, callbacks will always be called in the order they were connected.
 * @param {String} signalName The name of the signal to connect to
 * @param {Function} func The callback function
 * @param {Object} scope The object to be used as the 'this' within the callback.
 * @see FObservable#disconnect
 */
FObservable.prototype.connect=function(signalName,func,scope){
	if(this._connections==undefined)this._connections={};
	if(this._connections[signalName] == undefined){
		this._connections[signalName]=[];
	}
	if(scope==undefined)scope=this;
	this._connections[signalName].push({
			func:func
			,scope:scope
		});
}

/**
 * Disconnects a callback from the specified signal. If func is not provided, removes all callbacks from the signal.
 * @param {String} signalName
 * @param {Function} func
 */
FObservable.prototype.disconnect=function(eventName,func){
	if(this._connections==undefined)this._connections={};
	//only remove specified function
	if(func != undefined){
		var connections=this._connections[eventName];
		if(connections != undefined){
			for(var x=0;x<connections.length;x++){
				if(connections[x]==func){
					connections.splice(x,1);
				}
			}
		}
	} else{
		//remove all functions connected to event
		this._connections[eventName]=[];
	}
}

/**
 * Emits a signal of type sygnalName, sending the array params with the signal.
 * @param {String} signalName The name of the signal
 * @param {Array} params Additional parameters to send with the signal (optional)
 */
FObservable.prototype.emit=function(signalName,params){
	if(this._connections==undefined)this._connections={};
	var connections=this._connections[signalName];
	if(params==undefined)params=[];
	if(connections != undefined){
		for(var x=0;x<connections.length;x++){
			connections[x].func.apply(connections[x].scope,params);
		}
	}
	
}

/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */




/**
 * Represents a location in 2d space
 * @class
 */
function FVector(x,y){
	if(x==undefined)x=0;
	if(y==undefined)y=0;
	if(isNaN(x)){
		throw "x IS NAN!!!!!!";
	}
    this.x=x;
    this.y=y;
}




FVector.prototype = new Box2D.Common.Math.b2Vec2;
/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */


FWorldPositional.prototype=new FObservable;
FWorldPositional.prototype.constuctor=FWorldPositional;
FWorldPositional.prototype.parent=FObservable.prototype;
/**
 * A positional object has a position in the game world.
 * @class
 * @extends FObservable
 */
function FWorldPositional(){
	this.position = new FVector(0,0);
    this.positionBase='w'; //'w' = world based, 'c' = camera based
    this.angle=0;
	
}




/**
 * Sets the position of the center of the object in 2D space.
 * @param {FVector} p
 * @see FWorldPositional#getPosition
 */
FWorldPositional.prototype.setPosition=function(p){
	this.position = p;
};

/**
 * Returns the position of the object in @D space.
 * @see FWorldPositional#setPosition
 * @return {FVector} position
 */
FWorldPositional.prototype.getPosition=function(){
	return this.position;
};

/**
 * Returns the x coordinate of the object's current position 
 * @return {Number} the x coordinate
 */
FWorldPositional.prototype.getPositionX=function(){
	return this.getPosition().x;
};

/**
 * Returns the Y coordinate of the object's current position
 * @returns {Number} the Y coordinate
 */
FWorldPositional.prototype.getPositionY=function(){
	return this.getPosition().y;
};

/**
 * Returns the current angle of the positional object.
 * @returns {Number} the angle in radians
 */
FWorldPositional.prototype.getAngle=function(){
	
	return 0;
}

/**
 * Sets the current angle of the object
 * @param {number} a the angle in radians
 */
FWorldPositional.prototype.setAngle=function(a){
	
}
/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */

FRenderable.prototype=new FWorldPositional;
FRenderable.prototype.constructor=FRenderable;
/**
 * @extends FWorldPositional
 * @class
 * @returns {FRenderable}
 */
function FRenderable(){
	this.renderer = null;
    this.imageScale = 100;
	this.zPosition = 0;
	this.color="#000000";
}





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

FRenderable.prototype.setColor=function(c){
	this.color=c;
}

FRenderable.prototype.getColor=function(){
	return this.color;
}



/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */



//FEntity extends FRenderable
FPhysicsEntity.prototype = new FRenderable;
FPhysicsEntity.prototype.constructor=FPhysicsEntity;

/**
 * 
 * A an entity used in {@link FPhysicsWorld}
 * @class
 * @extends FRenderable
 */

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
    if(config.positionX!=undefined){
    	def.position.x=config.positionX;
    }
    if(config.positionY!=undefined){
    	def.position.y=config.positionY;
    }
    //def.fixedRotation=false;
    if(config.type=='static')def.type=b2Body.b2_staticBody;
    else def.type=Box2D.Dynamics.b2Body.b2_dynamicBody;
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
        	shape.width= shape.width!=undefined?shape.width:1;
        	shape.height= shape.height!=undefined?shape.height:1;
        	
            fixDef.shape=new b2PolygonShape();
            fixDef.shape.SetAsBox(shape.width/2,shape.height/2);
            width=shape.width;
        } else if(shape.type=='circle'){
        	width=shape.radius*2;
            fixDef.shape = new b2CircleShape(shape.radius);
        }
        
        fixDef.density=shape.density!=undefined?shape.density:1;
        fixDef.friction=shape.friction!=undefined?shape.friction:1;
        fixDef.restitution=shape.restitution!=undefined?shape.restitution:0;
        //console.log(fixDef)
        this.body.CreateFixture(fixDef);
    }
   // Firmament.log(this.body);
    this.body.ResetMassData();
    //this.position=this.body.m_xf.position; //tie the entity's position to the body's position
    
    //set z value
    this.zPosition =0;
    
    
    if(config.maxLifeSeconds){
    	setTimeout(function(){
    		this.destroy();
    	}.bind(this),config.maxLifeSeconds*1000);
    }
    
    
    if(config.color)this.setColor(config.color);
    
    
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



FPhysicsEntity.prototype.setVelocity=function(v){
	this.body.SetLinearVelocity(v);
}


FPhysicsEntity.prototype.destroy=function(){
	this.world.b2world.DestroyBody(this.body);
	this.world.destroyEntity(this)
}


FPhysicsEntity.prototype.deleteLater=FPhysicsEntity.prototype.destroy;



/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */

/**
 * 
 * @class
 * 
 */
function FWorld(){
	
	
	
}


FWorld.prototype={
		
	entities: []
		
};



FWorld.prototype.step=function(){};

FWorld.prototype.addEntity=function(ent){
	this.entities.push(ent);
};

FWorld.prototype.destroyEntity=function(ent){
	this.entities.splice(this.entities.indexOf(ent), 1);
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
/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */

/**
 * @class
 * @extends FWorld
 */

function FPhysicsWorld(gravity){
	this.collisions=[]
	this.b2world = new b2World(
            new b2Vec2(gravity.x, gravity.y)    //gravity
         ,  true                 //allow sleep
      );
	this.b2world.SetContactListener({
		BeginContact:function(contact){
			this.collisions.push(contact);
		}.bind(this)
		,EndContact:function(){}
		,PreSolve:function(){}
		,PostSolve:function(){}
	})
}


//extends FWorld
FPhysicsWorld.prototype = new FWorld;



FPhysicsWorld.prototype.step=function(fpsGoal){
	this.collisions=[];
	this.b2world.Step(
            1 / fpsGoal   //frame-rate
         ,  10       //velocity iterations
         ,  10       //position iterations
      );
	for(var x=0;x<this.collisions.length;x++){
		var c=this.collisions[x];
		var ent1=c.m_fixtureA.m_body.m_userData;
		var ent2=c.m_fixtureB.m_body.m_userData;
		
		ent1.emit("collide",[ent2,c]);
		ent2.emit("collide",[ent1,c]);
		//console.log("collission!");
		//console.log(c);
		
	}
	//this.world.DrawDebugData();
	this.b2world.ClearForces();
}

FPhysicsWorld.prototype.setGravity=function(gravity){
	this.b2world.SetGravity(gravity);
}

FPhysicsWorld.prototype.createEntity=function(config){
	//Firmament.log(this);
    var ent= new FPhysicsEntity(this,config);
    this.addEntity(ent);
    if(config.init){
    	//Firmament.log(ent._connections);
    	config.init.apply(ent,[]);
    }
    return ent;
};



FPhysicsWorld.prototype.getEntitiesInBox=function(topLeftX,topLeftY,bottomRightX,bottomRightY){
	var selectEntities=[];
	var query = new Box2D.Collision.b2AABB;
	
	query.upperBound.Set(bottomRightX,bottomRightY);
    query.lowerBound.Set(topLeftX,topLeftY);
    //Firmament.log(query,true);
    //Firmament.log(query);
    this.b2world.QueryAABB(function(fixture){
    	//Firmament.log("here");
    	selectEntities.push(fixture.GetBody().GetUserData());
    	return true;
    },query);
   // Firmament.log(selectEntities.length);
    return selectEntities;
}



/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */

/**
 * @class
 */
function FRenderer(){
	
}


/**
 * Renders a renderable object
 */
FRenderer.prototype.render=function(cxt,item,camera){
	
};




/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */


/**
 * 
 * @class
 */
function FWireframeRenderer(){
	
	
	
}


FWireframeRenderer.prototype = new FRenderer;


FWireframeRenderer.prototype.render = function(cxt,item,camera){
	var shapes=item.getShapes();
	cxt.fillStyle=item.getColor();
	cxt.strokeStyle=item.getColor();
	var bodyAngle=item.getAngle();
	//console.log(bodyAngle);
	for(var x=0;x<shapes.length;x++){
		var s=shapes[x];
		var pos = item.getPosition();
		
		if(s.m_vertices){
			this.renderPolygon(cxt,s,pos,bodyAngle);
		}
		else{
			this.renderCircle(cxt,s,pos,camera);
		}
	}
	
	//console.log(shapes);
}


FWireframeRenderer.prototype.renderCircle=function(cxt,s,pos,camera){
	var cameraPos=camera.getTopLeftPosition();
	cxt.beginPath();
	cxt.arc((pos.x-cameraPos.x)*camera.getZoom(),(pos.y-cameraPos.y)*camera.getZoom(),s.m_radius*camera.getZoom(),0,Math.PI*2,true);
	cxt.closePath();
	cxt.fill();
}

//todo: add polygon rotation
FWireframeRenderer.prototype.renderPolygon=function(cxt,s,pos,angle){
	cxt.beginPath();
	
	var verts=s.GetVertices();
	for(var x=0;x<verts.length;x++){
		//console.log((verts[x].x+pos.x)*100);
		cxt.moveTo((verts[x].x+pos.x)*100,(verts[x].y+pos.y)*100);
		var y=x+1;
		if(y>=verts.length){
			y=0;
		};
		cxt.lineTo((verts[y].x+pos.x)*100,(verts[y].y+pos.y)*100);
	}
	
	cxt.closePath();
	cxt.stroke();
}

/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */


/**
 * @class
 */

function FSpriteRenderer(){
	
	
	
}


FSpriteRenderer.prototype = new FRenderer;

var renderCount=0;
FSpriteRenderer.prototype.render = function(cxt,item,camera){
	var cameraPos=camera.getTopLeftPosition();
	var pos = item.getPosition();
	
	//make sure item is within rendering range
	/*if(pos.x < cameraPos.x-2 || pos.x >cameraPos.x+camera.getWidth()+2)return;
	if(pos.y < cameraPos.y-2 || pos.y >cameraPos.y+camera.getHeight()+2)return;*/
	
	
	
	var shapes=item.getShapes();
	
	var bodyAngle=item.getAngle();
	var image=item.getCurrentImage();
	var ratio=camera.getZoom()/item.getImageScale();
	
	var a=1,b=0,c=0,d=1,tx=0,ty=0;
	cxt.save();
	
	
	
	
	
	
	if(ratio!=1)
		cxt.scale(ratio,ratio);
	//Below code scales the matrix, but we can let the context do that.
	/*a*=ratio;
	b*=ratio;
	c*=ratio;
	d*=ratio;
	tx*=ratio;
	ty*=ratio;
	*/
	
	
	
	if(bodyAngle!=0){
		//rotate our matrix
		var _a=a;
		var _b=b;
		var _c=c;
		var _d=d;
		var _tx=tx;
		var _ty=ty;
		var sin=Math.sin(bodyAngle);
		var cos=Math.cos(bodyAngle);
		a=_a*cos-_b*sin;
		b=_a*sin + _b*cos;
		c = _c*cos - _d*sin;
		d = _c*sin +_d*cos;
		tx=_tx*cos-_ty*sin;
		ty =_tx*sin+_ty*cos;
		
		
		//apply rotation
		cxt.transform(a,b,c,d,tx,ty);
		
		
		
		//get inverse of matrix
		var ia=d/(a*d-b*c);
		var ib=-b/(a*d-b*c);
		var ic=-c/(a*d-b*c);
		var id=a/(a*d-b*c);
		var itx=(c*ty-d*tx)/(a*d-b*c);
		var ity=(a*ty-b*tx)/(a*d-b*c)
		
		
		
		//get x and y in relation to the inverted matrix
		var x=(pos.x-cameraPos.x)*camera.getZoom()/ratio;
		var y=(pos.y-cameraPos.y)*camera.getZoom()/ratio;
		var nx=ia*x+ic*y+itx;
		var ny=id*y+ib*x+ity;
		if(renderCount%50==0){
			/*console.log("x:"+x+" y:"+y)
			console.log("posx:"+pos.x+" posy:"+pos.y)
			console.log("zoom "+camera.getZoom())
			console.log("ratio "+ratio)
			console.log(" a:"+a+" b:"+b+" c:"+c+" d:"+d+" tx:"+tx+" ty:"+ty);
			console.log(" ia:"+ia+" ib:"+ib+" ic:"+ic+" id:"+id+" itx:"+itx+" ity:"+ity);
			console.log("ny:"+ny+ " nx:"+nx);
			console.log(cameraPos);*/
		}
	} else {
		var nx=(pos.x-cameraPos.x)*camera.getZoom()/ratio;
		var ny=(pos.y-cameraPos.y)*camera.getZoom()/ratio;
	}
	
	cxt.drawImage(image,nx-image.width/2,ny-image.height/2);
	cxt.restore();
	//console.log(shapes);
	renderCount++;
}

/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */





/**
 * FGame
 * Represents a game with worlds, entities, cameras, etc.
 * An FGame object manages both rendering and simulation of the game world.
 * @class
 */
function FGame(){
    
     
     /*
       //setup debug draw
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
        debugDraw.SetDrawScale(30.0);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(debugDraw);
        */
       
        window.setInterval(this._frameCount.bind(this),1000);
        this.fpsGoal=30;
        this.frames=0;
        this.instep=0;
        this.cameras=[];
		this.worlds=	[];
		this.fps=0;
		this.stepInterval=null;
      
}


FGame.prototype=new FObservable;

/**
 * Starts simulation and rendering loops.
 */
FGame.prototype.startSimulation=function(){
	 this.stepInterval=window.setInterval(this._step.bind(this), 1000 / this.fpsGoal);
};

/**
 * Stops simulation and rendering loops completely.
 */
FGame.prototype.stopSimulation=function(){
	 window.clearInterval(this.stepInterval);
};

/**
 * Adds a {@link FCamera} to the game.
 * A single game can have many cameras.
 * @param {FCamera} camera
 */
FGame.prototype.addCamera=function(camera){
	camera.setGame(this);
	this.cameras.push(camera);
};

/**
 * Adds a canvas to the game. This automatically creates a new camera for the canvas.
 * @param {CanvasElement} canvas
 * @return {FCamera} The generated camera object
 */
FGame.prototype.addCanvas = function(canvas){
	var c = new FCamera(canvas);
	this.addCamera(c);
	return c;
};



/**
 * Adds a {@link FWorld} to the game.
 * A single game can have many worlds.
 * @param world
 */
FGame.prototype.addWorld=function(world){
	this.worlds.push(world);
}

FGame.prototype._step=function() {
	if(this.instep)return;
	this.instep=true;
	
	if(this.fps>0&&this.fps<10){
		Firmament.log(this.worlds);
	}
	this.emit("beginStep");
	for(var x=0;x<this.worlds.length;x++){
		this.worlds[x].step(this.fpsGoal);
	}
	this.emit("endStep");
	//window.console.log(this.world);
	//call render on all cameras
	
	this.emit("endRender");
	for(var x=0; x<this.cameras.length;x++){
		this.cameras[x].render(this.worlds);
	}
	this.emit("endRender");
	this.frames++;
	this.instep=false;
  };
  
  FGame.prototype._frameCount=function(){
	  this.fps=this.frames;
	  this.emit("fpsUpdate",[this.fps]);
	  this.frames=0;
  }


/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */


/**
 * A camera to the game world.
 * In firmament, you use cameras to display content from the game world.
 * Cameras are attached to DOM Canvas Elements which they render to.
 *
 * @class FCamera
 * @param {CanvasElement} canvas - The canvas element on which the camera should render
 * @extends FWorldPositional
 */
function FCamera(canvas){
	this.canvas=canvas;
	this.width=canvas.width;
	this.height=canvas.height;


	this.game= null;
	this.zoom=100;
	this.topLeftPosition=new FVector();
	this.setPosition(new FVector(0,0));
}

FCamera.prototype=new FWorldPositional;


/**
 * Renders the contents of the camera onto its attached canvas.
 * This is normally called by FGame within the regular render loop.
 * @param {Array} worlds An array of {@link FWorld} objects to render.
 */
FCamera.prototype.render=function(worlds){
	var cxt = this.getCanvas().getContext('2d');
	cxt.clearRect(0, 0, this.width, this.height);

	this.emit('beginRender',[cxt]);
	for(var x=0;x<worlds.length;x++){
		var world = worlds[x];
		//just grab entities that are inside the camera for rendering
		var entities=world.getEntitiesInBox(this.position.x-this.width/2/this.zoom,this.position.y-this.height/2/this.zoom,this.position.x+this.width/2/this.zoom,this.position.y+this.height/2/this.zoom);
		//Firmament.log(entities);
		for(var y=0;y<entities.length;y++){
			var ent = entities[y];
			ent.getRenderer().render(cxt,ent,this);
		}
	}
	
	this.emit('endRender',[cxt]);
};

/**
 * Returns the canvas that the camera is attached to
 * @returns {CanvasElement}
 */
FCamera.prototype.getCanvas = function(){
	return this.canvas;
}

/**
 * Assigns the camera to the specified {@link FGame} instance.
 * This is normally called by the FGame object itself.
 * @param {FGame} g
 */
FCamera.prototype.setGame=function(g){
	this.game = g;
};


/**
 * Sets the width of the camera's display.
 * This is normally just set to the kkwidth of the canvas element
 * @param {int} w
 */

FCamera.prototype.setWidth=function(w){
    this.width=w;
    this.calculateTopLeftPosition();
};


/**
 * Returns the width of the camera. 
 * @returns {int}
 */
FCamera.prototype.getWidth=function(){
	return this.width;
}

/**
 * Sets the height of the camera's display
 * @param {int} h
 */

FCamera.prototype.setHeight=function(h){
    this.height=h;
    this.calculateTopLeftPosition();
};
/**
 * Returns the current height of the camera.
 * @returns {int}
 */
FCamera.prototype.getHeight=function(){
	return this.height;
};

/**
 * Returns the camera's current zoom ratio.
 * @returns {Number}
 */
FCamera.prototype.getZoom=function(){
	return this.zoom;
};

/**
 * Sets the camera's zoom ratio.
 * @param {Number} z
 */
FCamera.prototype.setZoom=function(z){
	this.zoom=z;
	this.calculateTopLeftPosition();
};


/**
 * Sets the position of the center of the camera in 2D space.
 * @param {FVector} pos
 */
FCamera.prototype.setPosition=function(pos){
	this.position=pos;
	this.calculateTopLeftPosition();
};


FCamera.prototype.getTopLeftPosition=function(){
	return this.topLeftPosition;
};

FCamera.prototype.calculateTopLeftPosition=function(){
	this.topLeftPosition.x=this.position.x-(this.width/this.zoom)/2;
	this.topLeftPosition.y=this.position.y-(this.height/this.zoom)/2;
};
/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */



/** 
 * @class
 * 
 * @param element  The element to attach signals to
 */
function FInput(element){
	if(element==undefined) element=document;
	this.listenElement=element;
	this.keysPressed={};
	element.onkeyup=this._keyup.bind(this);
	element.onkeydown=this._keydown.bind(this);

	element.ontouchstart=this._mouseDown.bind(this);
	element.ontouchend=this._mouseUp.bind(this);
	element.ontouchmove=this._mouseMove.bind(this);
	
	element.onmousedown=this._mouseDown.bind(this);
	element.onmouseup=this._mouseUp.bind(this);
	element.onmousemove=this._mouseMove.bind(this);
	element.selectstart=function(){return false;}
	this.mouseX=0;
	this.mouseY=0;
	this.leftMouseDown=false;
	this.rightMouseDown=false;
	
}

FInput.prototype=new FObservable;

/**
 * emitted when the mouse is pressed down
 * @name FInput#mouseDown
 * @event
 * @param {Event} e the javascript event object for the event
 */
FInput.prototype._mouseDown=function(e){
	this._updateMousePos(e);
	//console.log(e)
	this.leftMouseDown=true;
	this.emit('mouseDown',[e]);
};


/**
 * emitted when the mouse button is released
 * @name FInput#mouseUp
 * @event
 * @param {Event} e the javascript event object for the event
 */
FInput.prototype._mouseUp=function(e){
	this.leftMouseDown=false;
	
	this._updateMousePos(e);
	this.emit('mouseUp',[e]);
};


/**
 * emitted when the mouse is moved
 * @name FInput#mouseMove
 * @event
 * @param {Event} e the javascript event object for the event
 */
FInput.prototype._mouseMove=function(e){
	this._updateMousePos(e);
	
	//console.log(e);
	if(this.leftMouseDown){
		this.emit('mouseDrag',[e]);
	}
	this.emit('mouseMove', [e]);
};


/*
 * Function: getMouseScreenPos
 * Returns an <FVector> of the mouse's current position
 */
FInput.prototype.getMouseScreenPos=function(e){
	return new FVector(this.mouseX,this.mouseY);
};

/**
 * Returns the position in the world where the mouse is currently located based on camera
 * @param {FCamera} camera The camera
 */
FInput.prototype.getMouseWorldPos=function(camera){
	var offset=Firmament.getElementOffset(camera.getCanvas());
	
	var x=this.mouseX-offset.x;
	var y=this.mouseY-offset.y;
	var cameraPos = camera.getTopLeftPosition();
	var cameraZoom=camera.getZoom();
	x=(this.mouseX / cameraZoom) + cameraPos.x;
	y=(this.mouseY / cameraZoom) + cameraPos.y;
	return new FVector(x,y);
}
	

	
FInput.prototype._updateMousePos=function(e){
	if(e.x!==undefined){
		this.mouseX=e.x;
		this.mouseY=e.y;
	}else if(e.clientX!==undefined){
		this.mouseX=e.clientX;
		this.mouseY=e.clientY;
	}else if(e.pageX!==undefined){
		this.mouseX=e.pageX;
		this.mouseY=e.pageY;
	}
};

/**
 * emitted when a key on the keyboard is released
 * @name FInput#keyUp
 * @event
 * @param {int} keycode the keycode of the released key
 * @param {Event} e the javascript event object for the event
 */
FInput.prototype._keyup=function(e){
	var keyCode=this._getKeyCode(e);
	this.keysPressed[keyCode]=false;
	this.emit('keyUp',[keyCode,e]);
};


/**
 * emitted when a key on the keyboard is pressed
 * @name FInput#keyDown
 * @event
 * @param {int} keycode the keycode of the released key
 * @param {Event} e the javascript event object for the event
 */
FInput.prototype._keydown=function(e){
	var keyCode=this._getKeyCode(e);
	this.keysPressed[keyCode]=true;
	this.emit('keyDown',[keyCode,e]);
};


FInput.prototype._getKeyCode=function(e){
	var keynum;
	if(window.event) // IE
	{
		keynum = e.keyCode
	}
	else if(e.which) // Netscape/Firefox/Opera
	{
		keynum = e.which
	}
	return keynum;
}


FInput.prototype.isKeyPressed=function(key){
	if(this.keysPressed[key])return true;
	return false;
};


FInput.prototype.isMousePressed=function(button){
	switch(button){
	case 'left':
		return this.leftMouseDown;
	}
}


/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */

/**
 * @class
 * 
 */
var FTriangulator={
		EPSILON:0.0000000001
		,area :function(contour)
		{
			var n = contour.length;
			var A=0.0;
			var p=n-1;
			for(var q=0; q<n; p=q++)
			{
				A+= contour[p].x*contour[q].y - contour[q].x*contour[p].y;
			}
			return A*0.5;
		}


		/**
		 * decides if a povar P is Inside of the triangle
		 * defined by A, B, C.
		 */
		,insideTriangle:function(Ax,Ay,
								Bx, By,
								Cx, Cy,
								Px, Py){
			var ax, ay, bx, by, cx, cy, apx, apy, bpx, bpy, cpx, cpy;
			var cCROSSap, bCROSScp, aCROSSbp;
			
			ax = Cx - Bx;  ay = Cy - By;
			bx = Ax - Cx;  by = Ay - Cy;
			cx = Bx - Ax;  cy = By - Ay;
			apx= Px - Ax;  apy= Py - Ay;
			bpx= Px - Bx;  bpy= Py - By;
			cpx= Px - Cx;  cpy= Py - Cy;
			
			aCROSSbp = ax*bpy - ay*bpx;
			cCROSSap = cx*apy - cy*apx;
			bCROSScp = bx*cpy - by*cpx;
			
			return ((aCROSSbp >= 0.0) && (bCROSScp >= 0.0) && (cCROSSap >= 0.0));
		}
		
		
		,snip:function (contour, u, v, w, n,V)
		{
			  var p;
			  var Ax, Ay, Bx, By, Cx, Cy, Px, Py;

			  Ax = contour[V[u]].x;
			  Ay = contour[V[u]].y;

			  Bx = contour[V[v]].x;
			  By = contour[V[v]].y;

			  Cx = contour[V[w]].x;
			  Cy = contour[V[w]].y;

			  if ( this.EPSILON > (((Bx-Ax)*(Cy-Ay)) - ((By-Ay)*(Cx-Ax))) ) return false;

			  for (p=0;p<n;p++)
			  {
			    if( (p == u) || (p == v) || (p == w) ) continue;
			    Px = contour[V[p]].x;
			    Py = contour[V[p]].y;
			    if (this.insideTriangle(Ax,Ay,Bx,By,Cx,Cy,Px,Py)) return false;
			  }

			  return true;
			}
		,process:function(contour,result)
		{
			  /* allocate and initialize list of Vertices in polygon */

			  var n = contour.length;
			  if ( n < 3 ) return false;

			  var V = new Array();

			  /* we want a counter-clockwise polygon in V */

			  if ( 0.0 < this.area(contour) )
			    for (var v=0; v<n; v++) V[v] = v;
			  else
			    for(var v=0; v<n; v++) V[v] = (n-1)-v;

			  var nv = n;

			  /*  remove nv-2 Vertices, creating 1 triangle every time */
			  var count = 2*nv;   /* error detection */

			  for(var m=0, v=nv-1; nv>2; )
			  {
			    /* if we loop, it is probably a non-simple polygon */
			    if (0 >= (count--))
			    {
			      //** Triangulate: ERROR - probable bad polygon!
			      return false;
			    }

			    /* three consecutive vertices in current polygon, <u,v,w> */
			    var u = v  ; if (nv <= u) u = 0;     /* previous */
			    v = u+1; if (nv <= v) v = 0;     /* new v    */
			    var w = v+1; if (nv <= w) w = 0;     /* next     */

			    if ( this.snip(contour,u,v,w,nv,V) )
			    {
			      var a,b,c,s,t;

			      /* true names of the vertices */
			      a = V[u]; b = V[v]; c = V[w];

			      /* output Triangle */
			      result.push( contour[a] );
			      result.push( contour[b] );
			      result.push( contour[c] );

			      m++;

			      /* remove v from remaining polygon */
			      for(s=v,t=v+1;t<nv;s++,t++) V[s] = V[t]; nv--;

			      /* resest error detection counter */
			      count = 2*nv;
			    }
			  }



			  //delete V;

			  return true;
			}
		
		,getTriangles:function(shape){
			var res=[],triangles=[];
			if(!this.process(shape, res)){
				return false;
			}
			var triangleCount = res.length/3;
			for(var x=0;x<triangleCount;x++){
				triangles.push(
				[
				 res[x*3]
				 ,res[x*3+1]
				 ,res[x*3+2]
				 ]		
				)
			}
			return triangles;
		}
		
		
};
/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */
/**
 * @class FHelper
 * Provides extra functions to make working with firmament easier
 */

var FHelper={};

/*
var fg=fgame;
var FGame=fgame;
var fh=FHelper;*/


/**
 * Moves the camera directly over the provided entity.
 * @param {FEntity} entity the entity to center the camera on.
 */
FHelper.centerCameraOnEntity=function(entity){
    fgame.getMainCamera().setPosition({x:entity.getPositionX(),y:entity.getPositionY()});
}

/**
 * Shoots an entity of type [bulletDef] from the entity [origin] towards the current mouse position
 * @param {FEntity} origin The entity to shoot the bullet from
 * @param {FEntityConfig} bulletDef A config object for the entity to shoot towards the mouse 
 */
FHelper.shootBulletFromEntityToMouse=function(input,camera,world,entity,bulletDef){
	
    //get angle from entity to mouse
	var mouseWorldPos = input.getMouseWorldPos(camera);
	var entityPos = entity.getPosition();
    var xdiff=mouseWorldPos.x-entityPos.x;
    var ydiff=mouseWorldPos.y-entityPos.y;
    var angle=Math.atan2(ydiff,xdiff);
    bulletDef.positionX=entityPos.x+Math.cos(angle)*1.1;
    bulletDef.positionY=entityPos.y+Math.sin(angle)*1.1   ;
    /*console.log(angle)
    console.log(mouseWorldPos)
    console.log(JSON.stringify(entityPos))*/
    var bullet=world.createEntity(bulletDef);
    
    bullet.setVelocity({x:Math.cos(angle)*10,y:Math.sin(angle)*10});
    
}


/**
 * Moves the entity in the direction of angle, a distance of distance.
 * This function ignores physics and moves the character to that point no matter what.
 * @param {FEntity} entity the entity to be movec
 * @param {float} the angle of direction to move the entity
 * @param {float} distance The distance of game-world meters to move the entity 
 */
FHelper.moveEntityAtAngle=function(entity,angle,distance){
  
    entity.setVelocity(
                       entity.getVelocityX()+Math.cos(angle)*distance
                       ,entity.getVelocityY()+Math.sin(angle)*distance);
}

/**
 * Rotates the provided entity so it is pointing towards the point specified by x and y.
 * @param {FEntity} entity the entity to rotate
 * @param {float} x
 * @param {float} y
 */
FHelper.pointEntityTowardsPoint=function(entity,x,y){
    var xdiff=x-entity.getPositionX();
    var ydiff=y-entity.getPositionY();
    var angle = Math.atan2(ydiff,xdiff);
    entity.setAngle(angle);
}

/**
 * Rotates the provided entity towards the mouse.
 */
FHelper.pointEntityTowardsMouse=function(entity){
    FHelper.pointEntityTowardsPoint(entity,this.getMouseWorldX(),this.getMouseWorldY());
}

/**
 * returns in game-world coordinates the mouse's position on the X axis
 * @return {float} the position in the game world the mouse is currently over
 */
FHelper.getMouseWorldX=function(){
    var camera=fgame.getMainCamera();
    return (fgame.getMouseX()/camera.getZoom())+(camera.getPositionX()-(camera.getWidth()/camera.getZoom()/2));
}

/**
 * returns in game-world coordinates the mouse's position on the Y axis
 * @return {float} the position in the game world the mouse is currently over
 */
FHelper.getMouseWorldY=function(){
    var camera=fgame.getMainCamera();
    return (fgame.getMouseY()/camera.getZoom())+(camera.getPositionY()-(camera.getHeight()/camera.getZoom()/2));
}



/**
 * Shoots an entity of type [bulletDef] from the entity [origin] in the direction the entity is pointing
 * @param {FEntity} origin The entity to shoot the bullet from
 * @param {FEntityConfig} bulletDef A config object for the entity to shoot
 */
FHelper.shootBulletFromEntity=function(entity,bulletDef){
    
    bulletDef.positionX=entity.getPositionX()+Math.cos(entity.getAngle())*1.1;
    bulletDef.positionY=entity.getPositionY()+Math.sin(entity.getAngle())*1.1   ;
    var bullet=fgame.createEntity(bulletDef);
   
    bullet.setVelocity({x:Math.cos(entity.getAngle())*10,y:Math.sin(entity.getAngle())*10});
}


/**
 * Returns an appropriate value for an entity's imageScale property based on the values passed.
 * @param {object} params a config object with the following properties:<ul>
 *      <li><b>imageWidth</b> - the width of the image (required)</li>
 *      <li><b>entityWidth</b> - the width of the image (this or entity radius are required)</li>
 *      <li><b>entityRadius</b> - the radius of the entitity</li></ul>
 * @return {float} The proper scale value to make the image the same size as the entity
 */
FHelper.getImageScale=function(params){
    if(typeof(params)!='object'){
        throw("Param is not an object")
    }
    if(params.imageWidth && params.entityWidth){
        return params.imageWidth/params.entityWidth;
    }else if(params.imageWidth && params.entityRadius){
        return params.imageWidth/(params.entityRadius*2);
    }else{
        throw("required parameters imageWidth and either entityRadius or entityWidth missing.");
    }
}



/**
 *
 *  converts style object into css. 
 *  allows for easy creation of styles in json syntax.
 *  @note Javascript does not allow dashes in proprty names, so properties like 'font-weight' must be written in camel case: 'fontWeight'.
 *      To allow you to still use these properties, this function automatically converts 'fontWeight' to 'font-weight'.
 *  @example fh.css({
        color:'red'
        ,background:'transparent'
        ,fontWeight:'bold'
        ,fontSize:'20px'
    })    
 *  
**/
FHelper.css=function(object){
    
    function fixKey(key){
       var c=/[A-Z]/.exec(key)
       while(c&&typeof(c[0])!='undefined'){
            key=key.split(c[0]).join('-'+c[0].toLowerCase())
            c=/[A-Z]/.exec(key)
        }
        return key;
    }
    
    if(typeof(object)!='object'){
        return ''
    }
    var buffer='';
    for(key in object){
        buffer+=fixKey(key)+':'
        buffer+=object[key]+";"
    }
    return buffer;
}



/**
 * Handy function for debugging objects. Returns a string representation of the object provided
 * @param {mixed}
 * @return {string}
 */

FHelper.debug=function(object, indent){
    if(!indent)indent=0;
    var buffer="";
    for(i in object){
        buffer+="\n";
        for(var x=0;x<indent;x++){
            buffer+=" "
        }
        if(typeof (object[i]) == 'object'){
            buffer=buffer+i+"->"+FHelper.debug(object[i],indent+5);
        } else 
        buffer=buffer+i+"->"+object[i];
    }
    return buffer;
}

FHelper.extend=function() {
	 var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !FHelper.isFunction(target) ) {
		target = {};
	}

    //return the target if there's only one argument
	if ( length === i ) {
		return target
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( FHelper.isPlainObject(copy) || (copyIsArray = FHelper.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && FHelper.isArray(src) ? src : [];

					} else {
						clone = src && FHelper.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = FHelper.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};


FHelper.isArray=function(obj){
    if(toString.call(obj)=='[object Array]')return true; else return false;
}



FHelper.isPlainObject=function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj ) {
			return false;
		}
		
		// Not own constructor property must be Object
		if ( obj.constructor &&
			!hasOwn.call(obj, "constructor") &&
			!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}
	
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
	
		var key;
		for ( key in obj ) {}
		
		return key === undefined || hasOwn.call( obj, key );
	}


/**
 * Returns true if the passed object is a function
 */
FHelper.isFunction=function( obj ) {
		return typeof(obj)=='function'?true:false;
	}


/**
 * converts a decimal value to hexidecimal value
 * @param {int} value
 * @return {string} the hexidecimal value
 */
FHelper.dec2hex=function(d) {return d.toString(16);}

/**
 * Returns the global script object. This is handy for accessing the global scope.
 * @return {object} the global scope object
 */
FHelper.getGlobalObject=function(){
return (function(){
return this;
}).call(null);
}

FHelper.pi=3.14159265358979;
FHelper.oneEightyDevPi=180/FHelper.pi;
FHelper.piDevOneEighty=FHelper.pi/180;

/**
 * Converts radian angle to degrees
 * @param {float} rad The angle in radians
 * @return {float} the angle in degrees
 */
FHelper.rad2Deg=function(rad){
    return rad*this.pi180;
    
}

/**
 * Converts degree angle to radians
 * @param {float} rad The angle in degrees
 * @return {float} the angle in radians
 */
FHelper.deg2Rad=function(deg){
    return this.piDevOneEighty*deg;
}

/**
 * Builds an appropriate shapes array for an entity that contains a set of triangle shapes to make up the complex polygon shape.
 * Use this for building entities with shapes that would otherwise not be supported, such as concave polygons.
 * Example useage:
 * 
 *   fgame.createEntity({
 *                positionX:2
 *               ,positionY:2
 *               ,type:'static'
 *               ,shapes:FHelper.polyShape([
 *                   {x:0,y:0}
 *                   ,{x:0,y:1}
 *                   ,{x:1,y:1}
 *                   ,{x:2,y:2}
 *                   ,{x:2,y:1}
 *                   ,{x:1,y:0}
 *               ],{})
 *               ,init:function(){
 *               }
 *           })
 */
FHelper.polyShape=function(points,config){
    
    shapes=FGame.triangulateShape(points);
    var s=[];
    for(x=0;x<shapes.length;x++){
        s[x]=FHelper.extend({},config,{
            type:"polygon"
            ,vectors:shapes[x]
        })
    }
    return s;
}






/**
 * only works on polygon shapes
 *
 */
FHelper.breakEntity=function(entity,entConfig){
    for(var x=0;x<entity.shapes.length;x++){
        var shape=entity.shapes[x];
        //deactivate the parent entity
        //entity.setActive(false);
        
        
        if(shape.type=='polygon'){
            FGame.createEntity(FHelper.extend({},entConfig,{
                positionX:entity.getPositionX()
                ,positionY:entity.getPositionY()
                ,angle:entity.getAngle()
                ,shapes:FHelper.polyShape(shape.vectors,{})
            }))
        }
    }
    entity.deleteLater();
}




/**
 * only works on polygon shapes
 *
 */
FHelper.explodeEntity=function(entity,entConfig,subdivideCount){
    for(var x=0;x<entity.shapes.length;x++){
        var shape=entity.shapes[x];
        //deactivate the parent entity
        //entity.setActive(false);
        
        
        if(shape.type=='polygon'){
            var vectors=shape.vectors;
            for(var i=0;i<subdivideCount;i++){
                vectors=FGame.subdivideShape(vectors);
            }
            var shapes=FGame.triangulateShape(vectors);
            for(var j=0;j<shapes.length;j++){
                
                FGame.createEntity(FHelper.extend({},entConfig,{
                    positionX:entity.getPositionX()
                    ,positionY:entity.getPositionY()
                    ,angle:entity.getAngle()
                    ,shapes:FHelper.polyShape(shapes[j],{})
                }))
            }
        }
    }
    entity.deleteLater();
}

/**
 * Returns the distance between two points
 */
FHelper.vectorDistance=function(vec1,vec2){
    return Math.sqrt(Math.pow((vec2.x-vec1.x),2) + Math.pow((vec2.y-vec1.y),2));
}

/**
 * Includes all files within the directory
 * @param {string} directoy The path to the directory to inlude files from
 * @param {string} filter The filter to match files to include. Default is '*.js'
 */
FHelper.includeDirectory=function(directory,filter){
        if(!filter)filter="*.js";
        var files = FGame.getDirectoryContents(directory,filter);
        
        for(var x=0;x<files.length;x++){
            include(directory+"/"+files[x]);
        }
    }
    
//returns true if the object is a valid number    
FHelper.isInt=function(x){
   var y=parseInt(x); 
   if (isNaN(y)) return false; 
   return x==y && x.toString()==y.toString(); 
}

FHelper.keyboard={
    keyNames: {
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        16: 'shift',
        17: 'ctrl',
        18: 'alt',
        19: 'pause',
        20: 'caps-lock',
        27: 'esc',
        32: 'space',
        33: 'pg-up',
        34: 'pg-down',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        0x01000006: 'insert',
        0x01000007: 'delete',
        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',
        61: 'equals',
        65: 'a',
        66: 'b',
        67: 'c',
        68: 'd',
        69: 'e',
        70: 'f',
        71: 'g',
        72: 'h',
        73: 'i',
        74: 'j',
        75: 'k',
        76: 'l',
        77: 'm',
        78: 'n',
        79: 'o',
        80: 'p',
        81: 'q',
        82: 'r',
        83: 's',
        84: 't',
        85: 'u',
        86: 'v',
        87: 'w',
        88: 'x',
        89: 'y',
        90: 'z',
        93: 'context',
        96: 'num-0',
        97: 'num-1',
        98: 'num-2',
        99: 'num-3',
        100: 'num-4',
        101: 'num-5',
        102: 'num-6',
        103: 'num-7',
        104: 'num-8',
        105: 'num-9',
        106: 'num-multiply',
        107: 'num-plus',
        109: 'num-minus',
        110: 'num-period',
        111: 'num-division',
        112: 'f1',
        113: 'f2',
        114: 'f3',
        115: 'f4',
        116: 'f5',
        117: 'f6',
        118: 'f7',
        119: 'f8',
        120: 'f9',
        121: 'f10',
        122: 'f11',
        123: 'f12',
        187: 'equals',
        188: ',',
        190: '.',
        191: '/',
        220: '\\',
        224: 'win'
      }
      
      
    
}

/**
 * Finds entities that have a property with the specified value.
 * @param {String} property the name of the property to search
 * @param {String} value the value to match against
 * @return [Array] array of matching entities
 */
FHelper.findEntities=function(property,value){
    var entities=fg.getAllEntities();
    var matches=[];
    for(var x=0;x<entities.length;x++){
        if(entities[x][property]==value){
            matches.push(entities[x]);
        }
    }
    return matches;
}


/**
 * Returns the keycode for the key with the provided name.
 */
FHelper.getKeyCode=function(name){
    if (!FHelper.keyboard.keyMap) {
        var map = {};
        for (var key in FHelper.keyboard.keyNames) {
            map[FHelper.keyboard.keyNames[key]] = key;
        }
        FHelper.keyboard.keyMap = map;
    }
    return(FHelper.keyboard.keyMap[name]);
}
/**
 * returns true if the key identified by name is pressed.
 * @param {string} name The name of the key
 */
FHelper.isKeyPressed=function(name){
    return FGame.isKeyPressed({key:FHelper.getKeyCode(name)});
}


String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };
String.prototype.replaceAll=function(pattern,replace){
    var buff="";
    var copy=this.toString();
    while(1){
        buff=copy.replace(pattern,replace);
        if(buff==copy)break;
        else copy=buff;
    }
    return buff;
    
}








/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */
/**
 * Class: FEntityRepo
 * Singleton registry for storing element types
 */


var FEntityRepo={
    
    elements:{}
    
    /**
     * registers a new entity type in the registry.
     * @param {string} name the name of the new entity type
     * @param {Object} type an {@link FEntity} config object for the new type
     */
    ,addEntityType:function(name,type){
    	var completedShapes=[];
    	for(var x=0;x<type.shapes.length;x++){
    		var shape =type.shapes[x];
    		if(shape.type=='polygon'){
    			var v=FTriangulator.getTriangles(shape.vectors);
    			if(v!==false) {
    				for(var y=0;y<v.length;y++){
    					var ob = this.clone(shape);
    					ob.vectors = v[y];
    					ob.type='triangle';
    					completedShapes.push(ob);
    				}
    			}
    		}else{
    			completedShapes.push(shape)
    		}
    	}
    	type.shapes=completedShapes;
        this.elements[name]=type;
    }
    
    
    /**
     * Returns an {@link FEntity} config object from the registry of the specified type
     * @param {String} name the name of the type of  {@link FEntity} config object to return
     * @return {Object} The config object to create a {@link FEntity} object.
     */
    ,getEntityType:function(name){
        var ob=this.clone(this.elements[name]);
        ob._entityTypeName=name;
        return ob;
    }
    /**
     * Creates a new {@link FEntity} of type name and returns it.
     * This is a helper function that uses getEntityType in conjuction with {@link FGame#createEntity}.
     * @param {String} name the name of the {@link FEntity} type to create
     */
    ,createEntity:function(name){
        
        return FGame.createEntity(this.getEntityType(name));
    }
    
    ,clone:function (o) {
    	function c(o) {
    		for (var i in o) {
    		this[i] = o[i];
    		}
    		}

    		return new c(o);
    		}
    
};


/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */


/**
 * @class FStateMachine
 * Base class for creating a state machine
 */

function FStateMachine(states){
    this.states=states;
    this.currentState=null;
    this.currentStateId=null;
    
    this.setState=function(stateId){
        //do nothing if we're already in that state
        if(stateId==this.currentStateId) return;
        if(this.currentState!=null && typeof(this.stopState)=='function'){
            this.currentState.stopState.call(this);
        }
        if(this.states[stateId]){
            this.currentState=this.states[stateId]
            this.currentStateId=stateId;
            if(typeof(this.currentState.initState)=='function'){
                this.currentState.initState.call(this);
            }
        } else {
            throw "State of type "+stateId+' Is not a valid state object'
        }
    }
    
    /**
     *
     * Returns the currentState
     */
    this.getState=function(){
        return this.currentState;
    }
    
    /**
     * Calls the function of name func in the current state, in the scope of the state machine.
     * @param {function} func the name of the function to call
     * @param {Array} arguments the arguments to pass to the function
     * @note For the sake of speed, this function does not do any error checking.
     *
     */
    this.callState=function(func,args){
        this.currentState[func].apply(this,args)
    }
    
}

