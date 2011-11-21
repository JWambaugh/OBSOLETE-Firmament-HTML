

/**
 * FGame Class constructor.
 *
 */
function FGame(){
    
     
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
       
        window.setInterval(this.frameCount.bind(this),1000);
        this.fpsGoal=30;
        this.frames=0;
        this.instep=0;
        this.cameras=[];
		this.worlds=	[];
		this.fps=0;
		this.stepInterval=null;
      
}


FGame.prototype=new FObservable;


FGame.prototype.startSimulation=function(){
	 this.stepInterval=window.setInterval(this.step.bind(this), 1000 / this.fpsGoal);
};


FGame.prototype.stopSimulation=function(){
	 window.clearInterval(this.stepInterval);
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
	if(this.instep)return;
	this.instep=true;
	
	if(this.fps>0&&this.fps<10){
		Firmament.log(this.worlds);
	}
	this.emit("beginStep");
	for(var x=0;x<this.worlds.length;x++){
		this.worlds[x].step(this.fpsGoal);
	}
	this.emit("endStep");
	//window.console.log(this.world);
	//call render on all cameras
	
	this.emit("endRender");
	for(var x=0; x<this.cameras.length;x++){
		this.cameras[x].render(this.worlds);
	}
	this.emit("endRender");
	this.frames++;
	this.instep=false;
  };
  
  FGame.prototype.frameCount=function(){
	  this.fps=this.frames;
	  this.emit("fpsUpdate",[this.fps]);
	  this.frames=0;
  }


