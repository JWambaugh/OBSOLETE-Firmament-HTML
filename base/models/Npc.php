<?php

class Npc extends Doctrine_Record
{
	private $object;
	
	public function setTableDefinition()
	{
		$this->hasColumn('npc_type_id', 'int');
		$this->hasColumn('npc_spawner_id', 'int');
		$this->hasColumn('npc_stat_id', 'int');
		
	}

	
	public function setUp()
	{
		$this->hasOne('NpcType as type', array('local' => 'npc_type_id', 'foreign' => 'id'));
		$this->hasOne('NpcSpawner as spawner', array('local' => 'npc_spawner_id', 'foreign' => 'id'));
		
		$this->hasMany('Stat as stats', array('local' => 'stat_id', 'foreign' => 'npc_id', 'refClass' => 'NpcStat'));
		$this->loadTemplate('TimestampTemplate');
		
	}
	
	public function getObject(){
		if($this->object)return $this->object;
		else {
			$class = $this->spawner->type->class;
			if($class==""){
				$class="BaseNpc";
			}
			
			$this->object= new $class($this);
			return $this->object;
		}
	}
}

?> 