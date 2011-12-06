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

FSpriteRenderer.prototype.render = function(cxt,item,camera){
	var cameraPos=camera.getTopLeftPosition();
	var pos = item.getPosition();
	
	var bodyAngle=item.getAngle();
	var image=item.getCurrentImage();
	var ratio=camera.getZoom()/item.getImageScale();
	
	cxt.save();
	
	
	
	var nx=(pos.x-cameraPos.x)*camera.getZoom();
	var ny=(pos.y-cameraPos.y)*camera.getZoom();
	cxt.translate(nx,ny);
	
	if(ratio!=1)
		cxt.scale(ratio,ratio);
	
	
	var scaleRatio = camera.getZoom()/ratio;
	
	
	
	if(bodyAngle!=0){
		cxt.rotate(bodyAngle);
	}
		
	cxt.drawImage(image,0-image.width/2,0-image.height/2);
	cxt.restore();
	//console.log(shapes);
}
