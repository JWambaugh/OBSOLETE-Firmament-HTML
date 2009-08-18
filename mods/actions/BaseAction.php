<?php

abstract class BaseAction{
	private $actionRecord;
	private $params;
	
	const NO_EXIT = "noExit";
	
	function __construct($action){
		$this->actionRecord=$action;
		$this->setParams($action->getParameters());
	}
	
	public function setParams($params){
		$this->params=$params;
	}
	
	protected  function params(){
		return $this->params;
	}
	
	protected function player(){
		return $this->actionRecord->getPlayer();
	}
		
	public function onEnter($sector=null){
		
	}
	
	public function onLeave($sector=null){
		
	}
	
	/**
	 * This event is triggered right before the screen is displayed.
	 *
	 */
	public function onDisplay(){
		
	}
	
	/**
	 * This event is right after contents are displayed.
	 *
	 */
	public function afterDisplay(){
		
	}
	
	
	public function onCombat(){
		
	}
	
	public function onCombatComplete(){
		
	}
	
	public function onExecCommand($command){
		return false;
	}
	
	protected function getActionURL($action,$parameters=false){
		$name=get_class($this);
		$parameters=(array)$parameters;
		
		foreach ($parameters as $k=>$v){
			$parameters[$k]=urlencode($v);
		}
		$p=implode('&p[]=',$parameters);
		return "/action/$name?e=$action&p[]=$p";
	}
}

?>