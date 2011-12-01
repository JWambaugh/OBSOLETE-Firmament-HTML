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


/*
 * Class: FVector
 * represents a location in 2D space
 */

/*
 * Constructor: FVector
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