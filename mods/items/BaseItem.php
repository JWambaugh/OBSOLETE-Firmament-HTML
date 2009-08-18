<?php

class BaseItem{
	/**
	 * The PlayerItem object
	 *
	 * @var PlayerItem
	 */
	private $_itemRecord;
	private $data;
	function __construct(PlayerItem $record){
		$this->_itemRecord=$record;
		$this->data=$record->getData();
	}

	function save(){
		$this->$_itemRecord->setData($this->data);
		$this->$_itemRecord->save();
	}

	function player(){
		return $this->_itemRecord->player;
	}
	
	function itemRecord(){
		return $this->_itemRecord;
	}

	function onActivate(){

	}

	function onLeave(){

	}

	function onEnter(){

	}

	function onWeild(){

	}

	function onAttack(){

	}

	function onHit(){

	}
	
	
	public function onInsertItem(PlayerItem $item){
		true;
	}

	function getItemOptions(){
		
	}
	protected function getActionURL($action,$parameters=false){
		$name=get_class($this);
		$parameters=(array)$parameters;

		foreach ($parameters as $k=>$v){
			$parameters[$k]=urlencode($v);
		}
		$p=implode('&p[]=',$parameters);
		return "/itemAction/$name?id={$this->_itemRecord->id}&a=$action&p[]=$p";
	}
	
	function getWeight($baseWeight){
		return $baseWeight;
	}
	
	function getDescription(){
		return ($this->itemRecord()->item->description);
	}
}

	

?>