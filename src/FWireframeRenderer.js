/**
 * 
 */



function FWireframeRenderer(){
	
	
	
}


FWireframeRenderer.prototype = new FRenderer;


FWireframeRenderer.prototype.render = function(cxt,item,camera){
	var shapes=item.getShapes();
	
	
	for(var x=0;x<shapes.length;x++){
		var s=shapes[x];
		var pos = item.getPosition();
		//console.log(pos);
		if(s.m_radius){
			cxt.beginPath();
			cxt.arc(pos.x*100,pos.y*100,s.m_radius*100,0,Math.PI*2,true);
			cxt.closePath();
			cxt.stroke();
		}
	}
	
	//console.log(shapes);
}