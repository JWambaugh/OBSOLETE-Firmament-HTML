<?php

/*
 * Base class that all NPC's are decendents of.
 * This is the default NPC that provides most standard behavior.
 */
class BaseNpc {
	
	protected $npcRecord;
	
	
	
	function __construct(Npc $npc){
		$this->npcRecord = $npc;
	}
	
	
	function getName(){
		//return the name defined in type for now
		return $this->npcRecord->type->name;
	}
	
	
	function getDescription(){
		return "A {$this->npcRecord->type->name} is here.";
	}
	
	/**
	 * Tells the NPC to die.
	 *
	 */
	function dieNow(){
		$this->npcRecord->delete();
	}
	
	/**
	 * EVENT HANDLERS
	 */

	
	/**
	 * Called when the npc is first spawned.
	*/
	function onSpawn(){
	}

	
	/**
	 * Called each time a system update fires. Used for any tasks that need to be done on a regular timed interval
	 * Examples: Healing over time, dying after a certain amount of time, etc.
	 *
	 */
	function onTick(){
		
	}
	
	
	
	/**
	 * Called when a player enters the same sector as the npc.
	 */
	function onPlayerEnter(Player $player){
		
	}
	
	
	/**
	 * Called when a player attacks an Npc in this sector(could be this one or another one)
	 *
	 * @param Player $player
	 */
	function onPlayerFirstAttack(Player $player, Npc $npc){
		
	}
	
	
	
	/**
	 * Called when a battle with the NPC starts
	 * *not sure if we need this since we already have onPlayerFirstAttack?
	 *
	 * @param Battle $battl
	 */
	function onBattleStart(Battle $battle){
		
	}
	
	/**
	 * Called each time an attack is made against this or another npc in the sector.
	 *
	 * @param Player $player
	 * @param Npc $npc
	 */
	function onPlayerAttack(Player $player, Npc $npc){
		
	}
	
	
	
	/**
	 * Not sure if we will implement this one, but the idea is that this could be called when a player in the same sector performs an action
	 *
	 * @param Player $player
	 * @param Action $action
	 */
	function onPlayerAction(Player $player, Action $action){
		
	}
	
	
	
}


