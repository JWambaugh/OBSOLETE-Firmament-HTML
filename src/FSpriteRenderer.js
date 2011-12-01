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

