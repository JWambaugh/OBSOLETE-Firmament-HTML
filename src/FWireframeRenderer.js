/**
 * 
 */



function FWireframeRenderer(){
	
	
	
}


FWireframeRenderer.prototype = new FRenderer;


FWireframeRenderer.prototype.render = function(cxt,item,camera){
	var shapes=item.getShapes();
	
	var bodyAngle=item.getAngle();
	//console.log(bodyAngle);
	for(var x=0;x<shapes.length;x++){
		var s=shapes[x];
		var pos = item.getPosition();
		
		if(s.m_vertices){
			this.renderPolygon(cxt,s,pos,bodyAngle);
		}
		else{
			this.renderCircle(cxt,s,pos);
		}
	}
	
	//console.log(shapes);
}


FWireframeRenderer.prototype.renderCircle=function(cxt,s,pos){
	cxt.beginPath();
	cxt.arc(pos.x*100,pos.y*100,s.m_radius*100,0,Math.PI*2,true);
	cxt.closePath();
	cxt.stroke();
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

