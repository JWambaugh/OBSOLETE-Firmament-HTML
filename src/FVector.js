/**
 * FVector class
 * represents a location in 2D space
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




FVector.prototype = Object.create(Box2D.Common.Math.b2Vec2);