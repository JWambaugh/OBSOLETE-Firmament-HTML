/**
 * 
 */



function FSpriteRenderer(){
	
	
	
}


FSpriteRenderer.prototype = new FRenderer;


FSpriteRenderer.prototype.render = function(cxt,item,camera){
	var shapes=item.getShapes();
	var pos = item.getPosition();
	var bodyAngle=item.getAngle();
	var image=item.getCurrentImage();
	var x=pos.x*camera.getZoom() - image.width/2;
	var y=pos.y*camera.getZoom() - image.height/2;
	cxt.save();
	cxt.translate(x,y)
	cxt.rotate(bodyAngle);
	cxt.drawImage(image,0,0);
	cxt.restore();
	//console.log(shapes);
}

