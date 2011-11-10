/**
 * Firmament Game Engine
 * Copyright (C) Jordan CM Wambaugh
 * All Rights Reserved. Do not duplicate without express written permission.
 */

console.log(Box2D);

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

var Firmament={
		
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
		,loadImage:function(src){
			//if(this.images[src]!=undefined)return this.images[src];
			var img = document.createElement("img");
			img.src=src;
			this.images[src]=img;
			return img;
		}

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












