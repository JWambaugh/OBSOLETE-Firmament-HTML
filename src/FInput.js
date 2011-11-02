

function FInput(element){
	this.listenElement=element;
	this.keysPressed={};
	element.onkeyup=this._keyup.bind(this);
	element.onkeydown=this._keydown.bind(this);

	element.onmousdown=this._mouseDown.bind(this);
	element.onmouseup=this._mouseUp.bind(this);
}

FInput.prototype=new FObservable;


FInput.prototype._mouseDown=function(e){
	console.log(e)
	this.emit('mouseDown',[e]);
};



FInput.prototype._mouseUp=function(e){
	this.emit('mouseUp',[e]);
};


FInput.prototype._keyup=function(e){
	var keyCode=this._getKeyCode(e);
	this.keysPressed[keyCode]=false;
	this.emit('keyUp',[keyCode,e]);
};



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


