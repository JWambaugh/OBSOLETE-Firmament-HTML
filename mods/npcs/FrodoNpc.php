<?php
class FrodoNpc extends BaseNpc {

	function getDescription(){
		return "A {$this->npcRecord->type->name} is here. He looks quite gay.";
	}
	
	
/**
	 * Called when a player enters the same sector as the npc.
	 */
	function onPlayerEnter(Player $player){
		$player->addMessage("{$this->npcRecord->type->name} Looks up at you in disgust.");
	}
	
}

?>