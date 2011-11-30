
/**
 * class: FHelper
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








