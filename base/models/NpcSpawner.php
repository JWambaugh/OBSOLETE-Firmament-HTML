<?php

class NpcSpawner extends Doctrine_Record
{
	public function setTableDefinition()
	{
	
		$this->hasColumn('npc_type_id', 'int');
		$this->hasColumn('sector_id', 'int');
		$this->hasColumn('maxAlive', 'int');
		
		

	}

	public function setUp()
	{
		$this->hasOne('NpcType as type', array('local' => 'npc_type_id', 'foreign' => 'id'));
		$this->hasOne('Sector as sector', array('local' => 'sector_id', 'foreign' => 'id'));
		$this->hasMany('Npc as npcs', array('local' => 'id', 'foreign' => 'npc_spawner_id'));
		
		$this->loadTemplate('TimestampTemplate');
	}
}

?>