/**
 * 
 */



function FWireframeRenderer(){
	
	
	
}


FWireframeRenderer.prototype = new FRenderer;


FWireframeRenderer.prototype.render = function(cxt,item,camera){
	var shapes=item.getShapes();
	cxt.fillStyle=item.getColor();
	cxt.strokeStyle=item.getColor();
	var bodyAngle=item.getAngle();
	//console.log(bodyAngle);
	for(var x=0;x<shapes.length;x++){
		var s=shapes[x];
		var pos = item.getPosition();
		
		if(s.m_vertices){
			this.renderPolygon(cxt,s,pos,bodyAngle);
		}
		else{
			this.renderCircle(cxt,s,pos,camera);
		}
	}
	
	//console.log(shapes);
}


FWireframeRenderer.prototype.renderCircle=function(cxt,s,pos,camera){
	var cameraPos=camera.getTopLeftPosition();
	cxt.beginPath();
	cxt.arc((pos.x-cameraPos.x)*camera.getZoom(),(pos.y-cameraPos.y)*camera.getZoom(),s.m_radius*camera.getZoom(),0,Math.PI*2,true);
	cxt.closePath();
	cxt.fill();
}

//todo: add polygon rotation
FWireframeRenderer.prototype.renderPolygon=function(cxt,s,pos,angle){
	cxt.beginPath();
	
	var verts=s.GetVertices();
	for(var x=0;x<verts.length;x++){
		//console.log((verts[x].x+pos.x)*100);
		cxt.moveTo((verts[x].x+pos.x)*100,(verts[x].y+pos.y)*100);
		var y=x+1;
		if(y>=verts.length){
			y=0;
		};
		cxt.lineTo((verts[y].x+pos.x)*100,(verts[y].y+pos.y)*100);
	}
	
	cxt.closePath();
	cxt.stroke();
}

