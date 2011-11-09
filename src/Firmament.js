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












