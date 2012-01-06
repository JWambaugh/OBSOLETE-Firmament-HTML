


/**
 * A painter used for drawing on a canvas.
 * @param {CanvasElementContext} context
 * @class
 * @returns {FPainter}
 */
function FPainter(context){
	this.context=context;
}

/**
 * Returns the context used by the painter
 * @returns {CanvasElementContext}
 */
FPainter.prototype.getContext=function(){
	return this.context;
};



/**
 * Draws an image.
 * @param {Object} config A config object containing the following parameters:
 * 		image	- The image to render
 * 		x		- the position on the x axis to draw the image
 * 		y		- the position on the y axis to draw the image
 */
FPainter.prototype.drawImage=function(config){
	this.context.drawImage(config.image,config.x,config.y);
};

/**
 * Draws a line.
 * @param {Object} config A config object containing the following parameters:
 * 		{@link FVector} start - The position on the screen to begin drawing the line
 * 		{@link FVector} end	  - The position on the screen to end drawing the line
 * 
 */
FPainter.prototype.drawLine=function(config){
	this.context.save();
	this.context.beginPath();
	this.context.moveTo(config.start.x,config.start.y);
	this.context.lineTo(config.end.x,config.end.y);
	this.context.closePath();
	this.context.restore();
}


/**
 * Sets the color of the pen drawing.
 * @param {String} color  a valid CSS color 
 */
FPainter.prototype.setPenColor=function(color){
	this.context.strokeStyle=color;
};

/**
 * Sets the style of the pen.
 * Not currently supported in FirmamentWeb.
 * @param style
 */
FPainter.prototype.setPenStyle=function(style){
	
}




