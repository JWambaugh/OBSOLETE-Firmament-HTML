/**
 * 
 */




function FSound(fileName){
	
	this.fileName = fileName;
	
	
}



FSound.prototype.play = function(){
	return Firmament.getSoundManager().play(this);
}