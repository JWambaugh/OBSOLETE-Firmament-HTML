

/**
 * FGame Class constructor.
 *
 */
function FGame(gravity){
    if(!gravity){
        gravity=new FVector(0,0);
    }
     
     
     /*
       //setup debug draw
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
        debugDraw.SetDrawScale(30.0);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(debugDraw);
        */
        window.setInterval(this.step.bind(this), 1000 / 60);
      
}


FGame.prototype={
		 cameras: 	[]
		,worlds:	[]
};

FGame.prototype.addCamera=function(camera){
	camera.setGame(this);
	this.cameras.push(camera);
};

FGame.prototype.addCanvas = function(canvas){
	var c = new FCamera(canvas);
	this.addCamera(c);
};




FGame.prototype.addWorld=function(world){
	this.worlds.push(world);
}

FGame.prototype.step=function() {
	for(var x=0;x<this.worlds.length;x++){
		this.worlds[x].step();
	}
	
	//window.console.log(this.world);
	//call render on all cameras
	for(var x=0; x<this.cameras.length;x++){
		this.cameras[x].render(this.worlds);
	}
  };


