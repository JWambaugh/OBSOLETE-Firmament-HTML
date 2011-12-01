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
 * 
 * @param element  The element to attach signals to
 */
function FInput(element){
	if(element==undefined) element=document;
	this.listenElement=element;
	this.keysPressed={};
	element.onkeyup=this._keyup.bind(this);
	element.onkeydown=this._keydown.bind(this);

	element.ontouchstart=this._mouseDown.bind(this);
	element.ontouchend=this._mouseUp.bind(this);
	element.ontouchmove=this._mouseMove.bind(this);
	
	element.onmousedown=this._mouseDown.bind(this);
	element.onmouseup=this._mouseUp.bind(this);
	element.onmousemove=this._mouseMove.bind(this);
	element.selectstart=function(){return false;}
	this.mouseX=0;
	this.mouseY=0;
	this.leftMouseDown=false;
	this.rightMouseDown=false;
	
}

FInput.prototype=new FObservable;

/**
 * emitted when the mouse is pressed down
 * @name FInput#mouseDown
 * @event
 * @param {Event} e the javascript event object for the event
 */
FInput.prototype._mouseDown=function(e){
	this._updateMousePos(e);
	//console.log(e)
	this.leftMouseDown=true;
	this.emit('mouseDown',[e]);
};


/**
 * emitted when the mouse button is released
 * @name FInput#mouseUp
 * @event
 * @param {Event} e the javascript event object for the event
 */
FInput.prototype._mouseUp=function(e){
	this.leftMouseDown=false;
	
	this._updateMousePos(e);
	this.emit('mouseUp',[e]);
};


/**
 * emitted when the mouse is moved
 * @name FInput#mouseMove
 * @event
 * @param {Event} e the javascript event object for the event
 */
FInput.prototype._mouseMove=function(e){
	this._updateMousePos(e);
	
	//console.log(e);
	if(this.leftMouseDown){
		this.emit('mouseDrag',[e]);
	}
	this.emit('mouseMove', [e]);
};


/*
 * Function: getMouseScreenPos
 * Returns an <FVector> of the mouse's current position
 */
FInput.prototype.getMouseScreenPos=function(e){
	return new FVector(this.mouseX,this.mouseY);
};

/**
 * Returns the position in the world where the mouse is currently located based on camera
 * @param {FCamera} camera The camera
 */
FInput.prototype.getMouseWorldPos=function(camera){
	var offset=Firmament.getElementOffset(camera.getCanvas());
	
	var x=this.mouseX-offset.x;
	var y=this.mouseY-offset.y;
	var cameraPos = camera.getTopLeftPosition();
	var cameraZoom=camera.getZoom();
	x=(this.mouseX / cameraZoom) + cameraPos.x;
	y=(this.mouseY / cameraZoom) + cameraPos.y;
	return new FVector(x,y);
}
	

	
FInput.prototype._updateMousePos=function(e){
	if(e.x!==undefined){
		this.mouseX=e.x;
		this.mouseY=e.y;
	}else if(e.clientX!==undefined){
		this.mouseX=e.clientX;
		this.mouseY=e.clientY;
	}else if(e.pageX!==undefined){
		this.mouseX=e.pageX;
		this.mouseY=e.pageY;
	}
};

/**
 * emitted when a key on the keyboard is released
 * @name FInput#keyUp
 * @event
 * @param {int} keycode the keycode of the released key
 * @param {Event} e the javascript event object for the event
 */
FInput.prototype._keyup=function(e){
	var keyCode=this._getKeyCode(e);
	this.keysPressed[keyCode]=false;
	this.emit('keyUp',[keyCode,e]);
};


/**
 * emitted when a key on the keyboard is pressed
 * @name FInput#keyDown
 * @event
 * @param {int} keycode the keycode of the released key
 * @param {Event} e the javascript event object for the event
 */
FInput.prototype._keydown=function(e){
	var keyCode=this._getKeyCode(e);
	this.keysPressed[keyCode]=true;
	this.emit('keyDown',[keyCode,e]);
};


FInput.prototype._getKeyCode=function(e){
	var keynum;
	if(window.event) // IE
	{
		keynum = e.keyCode
	}
	else if(e.which) // Netscape/Firefox/Opera
	{
		keynum = e.which
	}
	return keynum;
}


FInput.prototype.isKeyPressed=function(key){
	if(this.keysPressed[key])return true;
	return false;
};


FInput.prototype.isMousePressed=function(button){
	switch(button){
	case 'left':
		return this.leftMouseDown;
	}
}


