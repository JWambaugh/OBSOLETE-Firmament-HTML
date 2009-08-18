<?php

class PlayerItem extends Doctrine_Record
{
	private $itemObject;
	private $merged=false;
	public function setTableDefinition()
	{
		// set 'user' table columns, note that
		// id column is auto-created as no primary key is specified

		$this->hasColumn('player_id', 'int');
		$this->hasColumn('item_id', 'int');
		$this->hasColumn('data','string');
		$this->hasColumn('container_id','integer');
		

	}

	public function setUp()
	{
		// notice the 'as' keyword here
		$this->hasOne('Player as player', array('local' => 'player_id', 'foreign' => 'id'));
		$this->hasOne('Item as item', array('local' => 'item_id', 'foreign' => 'id'));
		$this->hasOne('PlayerItem as container', array('local' => 'container_id', 'foreign' => 'id'));
		$this->hasMany('PlayerItem as contents', array('local' => 'id', 'foreign' => 'container_id'));
		
		
		$this->loadTemplate('TimestampTemplate');
	}




	public function getObject(){
		if(!$this->itemObject){
			$var =$this->item->class;
			$this->itemObject=new $var($this);
		}
		return $this->itemObject;
	}
	
	function getData(){
		if(!$this->merged){
			$this->merged=true;
			$this->data=serialize(array_merge((array)unserialize(($this->item->baseData)),(array)unserialize($this->data)));
		}
		return unserialize($this->data);
	}

	function getClass(){
		return $this->item->class;
	}
	
	function getType(){
		return $this->item->type;
	}
	
	function setData($data){
		$this->data=serialize($data);
	}
	
	
	/**
	 * Inserts an item into this item (using this item as a container)
	 *
	 * @param PlayerItem $item
	 */
	function insertItem(PlayerItem $item){
		if(!$this->item->container){
			return false;
		}
		if($this->getObject()->onInsertItem($item))
		$this->contents[]=$item;
		$item->container_id=$this->id;
		$this->save();
		$item->save();
	}
	
	function getWeight(){
		$weight=$this->baseWeight();

		if($this->container_id){
			$weight=$this->container->getObject()->getWeight($this->baseWeight());
		}
		if(count($this->contents))foreach ($this->contents as $item){
			$weight+=$item->getWeight();
		}
		return $weight;
	}
	
function getUnmodifiedWeight(){
		$weight=$this->baseWeight();

		if(count($this->contents))foreach ($this->contents as $item){
			$weight+=$item->getWeight();
		}
		return $weight;
	}
	
	function baseWeight(){
		return $this->item->weight;
	}

}

?>
