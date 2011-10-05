/**
 * FVector class
 * represents a location in 2D space
 */
function FVector(x,y){
    this.x=x;
    this.y=y;
}




FVector.prototype = Object.create(Box2D.Common.Math.b2Vec2);