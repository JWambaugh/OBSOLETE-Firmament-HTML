/**
 * 
 */



function FSoundManager(){
	this.cache={};
	this.players=[];
	
}


FSoundManager.prototype = new FObservable();

FSoundManager.prototype.loadSound=function(audioFile){
	this.cache[audioFile]={};
	this.cache[audioFile].sound = new FSound(audioFile);
	//preload it 
	this.cache[audioFile].player = new FSoundPlayer(this.cache[audioFile].sound);
	return this.cache[audioFile].sound;
}

FSoundManager.prototype.getSoundPlayer=function(sound){
	var soundP = new FSoundPlayer(sound);
	return soundP;
}


FSoundManager.prototype.play=function(sound){
	var soundP = this.getSoundPlayer(sound);
	this.players.push(soundP);
	soundP.play();
	return soundP;
}



