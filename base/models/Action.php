<?php

class Action extends Doctrine_Record
{
	private $object=null;
	private $player;
	private $parameters;
    public function setTableDefinition()
    {
        $this->hasColumn('name', 'string',50);
        $this->hasColumn('description','string');
        $this->hasColumn('class', 'string',30);
    }
    
    public function setUp()
    {
        $this->hasMany('SectorAction as sectorActions', array('local' => 'id', 'foreign' => 'action_id'));
        $this->loadTemplate('TimestampTemplate');
    }
    
    public function init($player,$params){
    	$this->setParameters($params);
    	$this->setPlayer($player);
    }
    
    public function setPlayer($player){
    	$this->player=$player;
    }
    
    public function getPlayer(){
    	return $this->player;
    }
    
    public function setParameters($string){
    	$this->parameters=explode("|",$string);
    }
    public function getParameters(){
    	return $this->parameters;
    }
		

	public function getObject(){
		if($this->object)return $this->object;
		else if($this->class){
			$this->object= new $this->class($this);
			return $this->object;
		}else{
			throw new Exception("No class set!");
		}
	}
}

?>
