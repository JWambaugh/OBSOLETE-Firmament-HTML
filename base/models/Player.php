<?php

class Player extends Doctrine_Record
{
	private $sector=false;
	private $descriptions=array();
	private $options=array();
	public function setTableDefinition()
	{
		// set 'user' table columns, note that
		// id column is auto-created as no primary key is specified
		$this->hasColumn('user_id', 'integer',10);
		$this->hasColumn('name', 'string',20);
		//$this->hasColumn('sector_id', 'integer',10);



		$this->hasColumn('plane_id', 'int');
		$this->hasColumn('latitude', 'int');
		$this->hasColumn('longitude', 'int');
	
	}

	
	public function setUp()
	{
		// notice the 'as' keyword here
		$this->hasOne('User as user', array('local' => 'user_id', 'foreign' => 'id'));
		$this->hasOne('Plane as plane', array('local' => 'plane_id', 'foreign' => 'id'));
		$this->hasMany('PlayerItem as items', array('local' => 'id', 'foreign' => 'player_id'));

		$this->hasMany('Message as messages',array('local'=>'id','foreign' => 'player_id'));
		$this->hasMany('Stat as stats', array('local' => 'player_id', 'foreign' => 'stat_id', 'refClass' => 'PlayerStat'));
		$this->loadTemplate('TimestampTemplate');
	}
	public function construct(){
		//Zend_Debug::dump($this->stats[$this->getStatKey('credits')]->toArray());
		//Zend_Debug::dump($this->stats->toArray());//->value;
	}


	
	public function latitude(){
		return $this->latitude;
	}
	
	public function longitude(){
		return $this->longitude;
	}
	
	public function plane(){
		return $this->plane;
	}
	
	public function morale(){
		return $this->morale;
	}
	
	public function items(){
		return $this->items;
	}
	
	
	/**
	 * adds an item to the player's inventory
	 *
	 * @param Item $item
	 */
	public function addItem(PlayerItem $item){
		$this->items[]=$item;
	}
	
	
	/**
	 * Moves the player in direction $direction
	 *
	 * @param unknown_type $direction
	 */
	public function move($direction){
		
		$t=$this->sector()->$direction();
		//Zend_Debug::dump($t->toArray(1));
		if($t)	$this->teleport($t);
		
	}
	
	function teleport(Sector $t){
		if($t){
			if(in_array(BaseAction::NO_EXIT,$this->triggerAction("onLeave")))return;
			$this->triggerItemEvent("onLeave");
			$this->tellNeighbors($this->name." has left the area.");
			$this->sector=$t;
			$this->latitude=$t->latitude();
			$this->longitude=$t->longitude();
			$this->plane_id=$t->plane_id;
			//Zend_Debug::dump($this->toArray(1));
			$this->triggerAction("onEnter");
			$this->triggerItemEvent("onEnter");
			$this->tellNeighbors($this->name." has entered the area.");
			$this->save();
		}
	}

	function sector(){
		if(!$this->sector)	$this->findSector();
		
		return $this->sector;
	}
	
	public function findSector(){
		$query=new Doctrine_Query();

		$t=Sector::getSector($this->plane,new Coordinate($this->latitude,$this->longitude));
		
		if($t){
			$this->sector= $t;
		}
	}
	
	
	public function tellNeighbors($text){
		
		$players=$this->sector()->players();
		if(count($players))foreach ($players as $player){
			if($player->id!=$this->id){
				if((time()-strtotime($player->updated))<60 && $player->latitude==$this->latitude && $player->longitude==$this->longitude)
					$player->addMessage($text);
			}
		}
	}
	
	
	
	public function triggerAction($event,$params=""){
		$retvals=array();
		if($params=="")$params=array();
		if(count($this->sector()->actions))foreach ($this->sector()->actions as $action){
	//	Zend_Debug::dump($action->action->toArray(1));
			$action->action->init($this,$action->parameters);
				$retvals[]= call_user_func_array(array($action->action->getObject(),$event),$params);
		}
		return $retvals;
	}
	
	public function triggerItemEvent($event,$params=""){
		if($params=="")$params=array();
		$retvals=array();
		if(count($this->items))foreach ($this->items as $item){
	//	Zend_Debug::dump($action->action->toArray(1));
				$retvals[]= call_user_func_array(array($item->getObject(),$event),$params);
		}
		return $retvals;
	}
	
	
	
	public function addDescription($d){
		$this->descriptions[]=$d;
	}
	
	public function getDescriptions(){
		return $this->descriptions;
	}
	
	public function addOption($d){
		$this->options[]=$d;
	}
	
	public function getOptions(){
		return $this->options;
	}
	public function addMessage($message){
		//Do some message cleanup. Delete the top message if we have more than 40.
		$c=count($this->messages);
		if($c>40){
			$this->messages->getFirst()->delete();
			$c--;
		}
		$this->messages[]->message=$message;
		$this->save();
	}
	public function getMessages(){
		
		return $this->messages;
	}
	
	public function runCommands($commands){
		foreach ($commands as $command) {;
			switch(strtolower($command)){
				
				case 'n':
					$this->move("up");
					break;
				case 'nw':
					$this->move("upLeft");
					break;
				case 'ne':
					$this->move("upRight");
					break;
				case 's':
					$this->move("down");
					break;
				case 'se':
					$this->move("downRight");
					break;
				case 'e':
					$this->move("right");
					break;
				case 'w':
					$this->move("left");
					break;
			}
			//send the command to any action handlers in this sector.
			//$this->addDescription(count($this->sector()->actions));
			foreach($this->sector()->actions as $action){
				$action->action->init($this,$action->parameters);
				$action->action->getObject()->onExecCommand($command);
			}
		}
	}
	
	/**
	 * Gives the player credits
	 *
	 * @param unknown_type $add
	 * @return unknown
	 */
	public function addCredits($add){
		$this->stats[$this->getStatKey('credits')]->value+=$add;
		$this->save();
		return $this->stats[$this->getStatKey('credits')]->value;
	}
	
	/**
	 * Subtracts credits from the player
	 *
	 * @param unknown_type $sub
	 * @return unknown
	 */
	public function subtractCredits($sub){
		if($sub > $this->stats[$this->getStatKey('credits')]->value)return false;
		$this->stats[$this->getStatKey('credits')]->value -= $sub;
		$this->save();
		return ;//$this->stats[$this->getStatKey('credits')]->value;
	}
	
	function getItemsByType($type){
		$found=array();
		foreach ($this->items as $item){
			if($item->item->type == $type){
				$found[]=$item;
			}
		}
		if(count($found)){
			return $found;
		}else{
			return false;
		}
	}
	
	function getItemByID($id){
		$found=array();
		foreach ($this->items as $item){
			if($item->id == $id){
				return $item;
			}
		}return false;
	}
	
	function getStatKey($name){
		if(count($this->stats))foreach($this->stats as $k=>$stat){
			if($stat->name == $name){
				return $k;
			}
			else return count($this->stats);
		}
	}
}

?>
