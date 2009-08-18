 <?php

class Stat extends Doctrine_Record
{
	public function setTableDefinition()
	{
		$this->hasColumn('name', 'string',20);
		$this->hasColumn('description', 'string');
		
		$this->hasColumn('value', 'string',20);
		
	}

	
	public function setUp()
	{
		$this->loadTemplate('TimestampTemplate');
		$this->hasMany('Player as players', array('local' => 'stat_id', 'foreign' => 'player_id', 'refClass' => 'PlayerStat'));
		$this->hasMany('Npc as npcs', array('local' => 'npc_id', 'foreign' => 'stat_id', 'refClass' => 'NpcStat'));
	}
	
}

?>